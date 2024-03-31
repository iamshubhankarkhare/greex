import axios from 'axios'
import { NextApiRequest } from 'next'

export const GET = async function handler(req: NextApiRequest) {
  const API_KEY = process.env.COIN_GECKO_API_KEY
  const API_URL: string = `https://api.coingecko.com/api/v3/search/trending`

  try {
    const response = await axios.get(API_URL, {
      headers: {
        'x-cg-api-key': API_KEY,
      },
    })

    const coins = response.data?.coins ?? []
    return Response.json({ entities: coins })
  } catch (err: any) {
    console.error('sever msg :', err)
    return new Response(`error: ${err.message}`, {
      status: 400,
    })
  }
}
