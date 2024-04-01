import axios, { CancelTokenSource } from 'axios'

let cancelTokenSource: CancelTokenSource | null = null
export const GET = async function handler(req: Request) {
  const API_KEY = process.env.COIN_GECKO_API_KEY
  const url: string = req?.url || ''
  const { searchParams } = new URL(url)
  const coin: string | null = searchParams.get('coin')
  // Cancel previous request if it exists
  if (cancelTokenSource) {
    cancelTokenSource.cancel('Only one request allowed at a time')
  }

  if (!coin) {
    return new Response('error: coin is required', { status: 400 })
  }

  try {
    const url = `https://api.coingecko.com/api/v3/coins/${coin}/ohlc?vs_currency=usd&days=365`
    cancelTokenSource = axios.CancelToken.source()
    const response = await axios.get(url, {
      headers: {
        'x-cg-api-key': API_KEY,
      },
      cancelToken: cancelTokenSource.token,
    })

    const sortedData = response.data.sort(
      (a: number[], b: number[]) => a[0] - b[0],
    )
    const formattedData = sortedData.map((el: number[]) => {
      const [time, open, high, low, close] = el
      const date = new Date(time).toISOString().split('T')[0]
      return { time: date, open, low, high, close }
    })

    return Response.json({ entities: formattedData })
  } catch (err: any) {
    console.error('sever msg :', err.response.data.status)
    const msg =
      err.response?.data?.status?.error_message ||
      err.response?.statusText ||
      'Internal Server Error'
    console.error('msg from history', msg)
    return new Response(`${msg}`, {
      status: err.response?.status || 500,
    })
  }
}
