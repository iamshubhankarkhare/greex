'use client'
import React, { useMemo, useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  percentageRoundOff,
  formatCurrency,
} from '@/lib/priceConvertors/formatter'
import { TrendingCoin } from '@/types/candleStickChart'

const CoinList = ({ searchInput }: { searchInput: string }) => {
  const [coinListData, setCoinListData] = useState<TrendingCoin[]>([])
  const [error, setError] = useState(null)
  const [filteredCoins, setFilteredCoins] = useState<TrendingCoin[]>([])

  // methods

  /**
   * @description: This function is used to get the percentage text class based on the percentage value
   * @param {number} percentage
   * @returns {string} tailwind class
   */
  const getPercentageTextClass = (percentage: number): string => {
    if (percentage < 0) return 'text-red-700'
    else if (percentage > 0) return 'text-green-700'
    else return ' text-[#4e5054]'
  }

  // lifecycle

  const memoizedCoinListData = useMemo(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/getCoinList`)
        return response?.data?.entities as TrendingCoin[]
      } catch (err: any) {
        console.error('Error fetching coin list:', err)
        setError(err.response?.data)
      }
    }
    return fetchData
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const data = (await memoizedCoinListData()) as TrendingCoin[]
      setCoinListData(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (coinListData) {
      const filtered = coinListData.filter(
        (coin) =>
          coin.item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          coin.item.symbol.toLowerCase().includes(searchInput.toLowerCase()),
      )
      setFilteredCoins(filtered)
    }
  }, [coinListData, searchInput])

  // UI
  if (error) {
    return (
      <div className="text-red-500 flex items-center justify-center">
        Error in fetching
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center jusify-center bg-gray-900 bg-[#1D1F22] w-full h-full rounded-lg overflow-auto">
      <div className="w-full">
        {filteredCoins &&
          filteredCoins.length > 0 &&
          filteredCoins.map((coin: any, i: number) => (
            <Link
              href={`/dashboard?coin=${coin?.item?.id}`}
              key={coin?.item?.id}
              className={`w-full `}
            >
              <div
                key={coin?.item?.name}
                className={` cursor-pointer px-0 mx-4 py-4 flex items-center justify-between   border-0.5 border-[#4e5054] ${i === filteredCoins.length - 1 ? 'border-b-0' : 'border-b'}`}
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
                    %
                  </span>
                </div>
              </div>
            </Link>
          ))}
        {/* handle the case when there are no coins */}
        {filteredCoins && !filteredCoins.length && (
          <div className="text-[#4e5054] flex items-center justify-center h-72 bg-transparent">
            No coins found
          </div>
        )}
      </div>
    </div>
  )
}

export default CoinList
