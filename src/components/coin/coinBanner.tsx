'use client'
import React, { useMemo, useState, useEffect, Suspense } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { BasicCoin } from '@/types/candleStickChart'
import { useSearchParams } from 'next/navigation'
import { CoinData } from '@/types/coin'
import {
  percentageRoundOff,
  formatCurrency,
} from '@/lib/priceConvertors/formatter'

const CoinBanner = () => {
  const [coinData, setCoinData] = useState<CoinData>()
  const [error, setError] = useState<null | string>(null)
  const [selectedCoin, setSelectedCoin] = useState<string>('bitcoin')
  const searchParams = useSearchParams()

  // methods

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/api/getCoinById?coin=${selectedCoin}`, // api doesn't expect an empty coin
      )
      const data = response?.data as CoinData
      console.log(data)
      setCoinData(data)
      setError(null)
    } catch (err: any) {
      console.error('Error fetching coin list:', err)
      setError(err.response?.data)
    }
  }

  // lifecycle
  useEffect(() => {
    const coin = searchParams.has('coin') ? searchParams.get('coin') : 'bitcoin'
    if (coin) {
      setSelectedCoin(coin)
    }
  }, [searchParams])

  // Polling - Fetch data every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData()
    }, 30000) // 30 seconds

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(intervalId)
  }, [selectedCoin]) // Polling should restart if selectedCoin changes

  // Fetch data on component mount and coin change
  useEffect(() => {
    fetchData()
  }, [selectedCoin])

  //UI
  const coinDataColumnsData = [
    {
      label: 'Price',
      value: coinData
        ? formatCurrency(coinData.market_data.current_price.usd, 5, '$')
        : '-',
      isPercentage: false,
    },
    {
      label: '24h Change',
      value: coinData
        ? percentageRoundOff(
            coinData.market_data.price_change_percentage_24h,
            2,
          )
        : '-',
      isPercentage: true,
    },
    {
      label: '24h High',
      value: coinData
        ? formatCurrency(coinData.market_data.high_24h.usd, 4, '$')
        : '-',
      isPercentage: false,
    },
    {
      label: '24h Low',
      value: coinData
        ? formatCurrency(coinData.market_data.low_24h.usd, 4, '$')
        : '-',
      isPercentage: false,
    },
    {
      label: 'Volume(BTC)',
      value: coinData
        ? formatCurrency(coinData.market_data.total_volume.btc, 2, '')
        : '-',
      isPercentage: false,
    },
    {
      label: 'Volume(USD)',
      value: coinData
        ? formatCurrency(coinData.market_data.total_volume.usd, 0, '$')
        : '-',
      isPercentage: false,
    },
    {
      label: 'Market Cap',
      value: coinData
        ? formatCurrency(coinData.market_data.market_cap.usd, 0, '$')
        : '-',
      isPercentage: false,
    },
  ]

  const CoinDataColumn = ({
    label,
    value,
    isPercentage = false,
  }: {
    label: string
    value: string | number
    isPercentage?: boolean
  }) => {
    const getPercentageTextClass = (percentage: number): string => {
      if (percentage < 0) return 'text-red-700'
      else if (percentage > 0) return 'text-green-700'
      else return ' text-white'
    }

    return (
      <div className="flex items-center flex-col">
        <span className="text-[#75797E] text-xs">{label}</span>
        <span
          className={` text-base ${isPercentage ? getPercentageTextClass(value as number) : 'text-white'}`}
        >
          {value}
          {isPercentage && '%'}
        </span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500 flex items-center justify-center p-4">
        {error && <h1>{error ? error : 'Error in fetching'}</h1>}
      </div>
    )
  }

  return (
    <Suspense>
      <div className="flex items-center p-5 h-20">
        <div className="flex items-center">
          <Avatar className="flex items-center justify-center w-8">
            <AvatarImage
              src={coinData?.image.large}
              alt={coinData?.name}
              className="w-8 h-8"
            />
            <AvatarFallback className="w-8 h-8">
              {coinData?.symbol.substr(0, 1)}
            </AvatarFallback>
          </Avatar>
          <span className="text-white text-lg ml-3 uppercase">
            {coinData?.symbol}/USDT
          </span>
        </div>
        <Separator orientation="vertical" className="mx-10" />
        <div className="flex items-center justify-around w-full">
          {coinDataColumnsData.map((column, i) => (
            <CoinDataColumn
              key={i}
              label={column.label}
              value={column.value}
              isPercentage={column.isPercentage}
            />
          ))}
        </div>
      </div>
    </Suspense>
  )
}

export default CoinBanner
