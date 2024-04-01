import axios, { CancelTokenSource } from 'axios'

let cancelTokenSource: CancelTokenSource | null = null
export const GET = async function handler(req: Request) {
  const API_KEY = process.env.COIN_GECKO_API_KEY
  const API_URL: string = `https://api.coingecko.com/api/v3/search/trending`
  // Cancel previous request if it exists
  if (cancelTokenSource) {
    cancelTokenSource.cancel('Only one request allowed at a time')
  }

  try {
    cancelTokenSource = axios.CancelToken.source()
    const response = await axios.get(API_URL, {
      headers: {
        'x-cg-api-key': API_KEY,
      },
      cancelToken: cancelTokenSource.token,
    })

    const coins = response.data?.coins ?? []
    return Response.json({ entities: coins })
  } catch (err: any) {
    console.error('sever msg :', err)
    const msg =
      err.response?.data?.status?.error_message ||
      err.response?.statusText ||
      'Internal Server Error'
    console.error('sfdgdsjhfgsdhjfgdsakhjfgdsakhjfgjs', msg)
    return new Response(`${msg}`, {
      status: err.response?.status || 500,
    })
  }
}
