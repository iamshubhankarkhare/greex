'use client'
import React, { useMemo, useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { BasicCoin } from '@/types/candleStickChart'

const AllCoinList = ({ searchInput }: { searchInput: string }) => {
  const [coinListData, setCoinListData] = useState<BasicCoin[]>([])
  const [error, setError] = useState(null)
  const [filteredCoins, setFilteredCoins] = useState<BasicCoin[]>([])

  // lifecycle

  const memoizedCoinListData = useMemo(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/getCoinSearch?coin=${searchInput === '' ? 'a' : searchInput}`, // api doesn't expect an empty coin
        )
        return response?.data?.entities as BasicCoin[]
      } catch (err: any) {
        console.error('Error fetching coin list:', err)
        setError(err)
      }
    }
    return fetchData
  }, [searchInput])

  useEffect(() => {
    const fetchData = async () => {
      const data = (await memoizedCoinListData()) as BasicCoin[]
      setCoinListData(data)
      console.log(data)
    }
    fetchData()
  }, [searchInput])

  useEffect(() => {
    if (coinListData) {
      const filtered = coinListData.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchInput.toLowerCase()),
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
    <div className="flex flex-col items-center jusify-center bg-[#1D1F22] w-full h-full rounded-lg overflow-auto">
      <div className="w-full">
        {filteredCoins &&
          filteredCoins.length > 0 &&
          filteredCoins.map((coin: any, i: number) => (
            <Link
              href={`/dashboard?coin=${coin?.id}`}
              key={coin?.id}
              className={`w-full `}
            >
              <div
                key={coin?.name}
                className={` cursor-pointer px-0 mx-4 py-4 flex items-center justify-between   border-0.5 border-[#4e5054] ${i === filteredCoins.length - 1 ? 'border-b-0' : 'border-b'}`}
              >
                <div className="flex w-full">
                  <Avatar className="flex items-center justify-center w-5">
                    <AvatarImage
                      src={coin?.thumb}
                      alt={coin?.name}
                      className="w-5 h-5"
                    />
                    <AvatarFallback className="w-5 h-5">
                      {coin?.symbol.substr(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col ml-3">
                    <span className="text-sm ">{coin?.name}</span>
                    <span className="text-xs text-[#4e5054]">
                      {coin?.symbol}
                    </span>
                  </div>
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

export default AllCoinList
