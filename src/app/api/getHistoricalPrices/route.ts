import axios from 'axios'
import { NextApiRequest } from 'next'

export const GET = async function handler(req: NextApiRequest) {
  const API_KEY = process.env.COIN_GECKO_API_KEY
  const url: string = req?.url || ''
  const { searchParams } = new URL(url)
  const coin: string | null = searchParams.get('coin')

  if (!coin) {
    return new Response('error: coin is required', { status: 400 })
  }

  try {
    const url = `https://api.coingecko.com/api/v3/coins/${coin}/ohlc?vs_currency=usd&days=365`
    const response = await axios.get(url, {
      headers: {
        'x-cg-api-key': API_KEY,
      },
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
    console.error(err.message)
    return new Response(`error: ${err.message}`, {
      status: 400,
    })
  }
}
