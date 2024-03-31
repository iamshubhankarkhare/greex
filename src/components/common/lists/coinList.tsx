import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  percentageRoundOff,
  formatCurrency,
} from '@/lib/priceConvertors/formatter'

const CoinList = async () => {
  // methods
  const fetchCoinList = async () => {
    // this is a server component so we need to use the base url
    const baseUrl =
      process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_BASE_URL_DEV
        : process.env.NEXT_PUBLIC_BASE_URL_PROD

    try {
      const response = await axios.get(`${baseUrl}/api/getCoinList`)
      return response?.data?.entities
    } catch (err: any) {
      return {
        error: err,
      }
    }
  }
  const coinListData = await fetchCoinList()
  console.log('coinListData', coinListData)
  if (coinListData?.error) {
    return (
      <div className="text-red-500 flex items-center justify-center">
        Error in fetching
      </div>
    )
  }
  /**
   * @description: This function is used to get the percentage text class based on the percentage value
   * @param {number} percentage
   * @returns {string}
   */
  const getPercentageTextClass = (percentage: number): string => {
    if (percentage < 0) return 'text-red-700'
    else if (percentage > 0) return 'text-green-700'
    else return ' text-[#4e5054]'
  }

  // UI
  return (
    <div className="flex flex-col items-center jusify-center bg-[#1D1F22] w-full h-full rounded-lg overflow-auto">
      <div className="w-full">
        {coinListData &&
          coinListData.length &&
          coinListData.map((coin: any, i: number) => (
            <Link
              href={`/dashboard?coin=${coin?.item?.id}`}
              key={coin?.item?.id}
              className={`w-full `}
            >
              <div
                key={coin?.item?.name}
                className={` cursor-pointer px-0 mx-4 py-4 flex items-center justify-between   border-0.5 border-[#4e5054] ${i === coinListData.length - 1 ? 'border-b-0' : 'border-b'}`}
              >
                <div className="flex w-full">
                  <Avatar className="flex items-center justify-center w-5">
                    <AvatarImage
                      src={coin?.item?.small}
                      alt={coin?.item?.name}
                      className="w-5 h-5"
                    />
                    <AvatarFallback className="w-5 h-5">
                      {coin?.item?.symbol.substr(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col ml-3">
                    <span className="text-sm ">{coin?.item?.name}</span>
                    <span className="text-xs text-[#4e5054]">
                      {coin?.item?.symbol}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm ">
                    {formatCurrency(coin?.item?.data?.price, 4, '$')}
                  </span>
                  <span
                    className={`text-xs ${getPercentageTextClass(coin.item.data?.price_change_percentage_24h?.usd)}`}
                  >
                    {percentageRoundOff(
                      coin.item.data?.price_change_percentage_24h?.usd,
                      2,
                    )}
                  </span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}

export default CoinList
