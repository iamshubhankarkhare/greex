export interface CandleData {
  time: string
  open: number | null
  low: number | null
  high: number | null
  close: number | null
}

export interface TrendingCoin {
  item: {
    name: string
    id: string
    symbol: string
    thumb: string
    small: string
    large: string
    price_btc: number
    data: {
      price: number
      price_change_percentage_24h: {
        [key: string]: number
      }
      market_cap: string
      total_volume: string
      sparkline: string
    }
  }
}

export interface BasicCoin {
  id: string
  name: string
  api_symbol: string
  symbol: string
  market_cap_rank: number
  thumb: string
  large: string
}
