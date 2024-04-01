'use client'
import React, { Suspense, useState, useEffect, useRef } from 'react'
import { ISeriesApi, createChart } from 'lightweight-charts'
import { useSearchParams } from 'next/navigation'

import {
  candleStickChartOptions,
  chartBaseOptions,
} from '@/constants/basicChartConfig'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { CandleData } from '@/types/candleStickChart'

const Chart = () => {
  const searchParams = useSearchParams()

  // states and ref
  const chartRef = useRef<HTMLDivElement>(null)
  const pricesWs = useRef<WebSocket | null>(null)
  const [selectedCoin, setSelectedCoin] = useState('bitcoin') // Default to Bitcoin
  const [priceData, setPriceData] = useState<CandleData[]>([])
  const [error, setError] = useState(null)
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)
  const [currentBar, setCurrentBar] = useState<CandleData>({
    open: null,
    high: null,
    low: null,
    close: null,
    time: new Date().toISOString().split('T')[0],
  })

  // methods
  const fetchPrice = async () => {
    try {
      const response = await axios.get(
        `/api/getHistoricalPrices?coin=${selectedCoin}`,
      )
      setPriceData(response.data.entities)
    } catch (err: any) {
      setError(err.message)
    }
  }

  const mergeTickToBar = (price: number) => {
    setCurrentBar((prevBar) => {
      if (prevBar.open === null) {
        return {
          open: price,
          high: price,
          low: price,
          close: price,
          time: priceData[priceData.length - 1]?.time,
        }
      } else {
        const temp = { ...prevBar }
        temp.close = price
        temp.high =
          prevBar.high !== null ? Math.max(prevBar.high, price) : price
        temp.low = prevBar.low !== null ? Math.min(prevBar.low, price) : price

        if (priceData?.length > 0)
          temp.time = priceData[priceData.length - 1]?.time
        return temp
      }
    })
  }

  // lifecycle
  useEffect(() => {
    if (currentBar && candlestickSeriesRef.current) {
      candlestickSeriesRef.current.update(currentBar)
    }
  }, [currentBar])

  useEffect(() => {
    const coin = searchParams.has('coin') ? searchParams.get('coin') : 'bitcoin'
    if (coin) {
      setSelectedCoin(coin)
    }
  }, [searchParams])

  useEffect(() => {
    if (!chartRef.current || !priceData.length) {
      return
    }
    const chart = createChart(chartRef.current, chartBaseOptions)
    candlestickSeriesRef.current = chart.addCandlestickSeries(
      candleStickChartOptions,
    )

    candlestickSeriesRef.current.setData(priceData)
    chart.timeScale().fitContent()

    if (!pricesWs.current) {
      pricesWs.current = new WebSocket(
        `wss://ws.coincap.io/prices?assets=${selectedCoin}`,
      )

      pricesWs.current.onmessage = function (msg) {
        console.log('msg', msg)
        // Update the last candlestick with the live price
        if (msg.data) {
          const priceObject = JSON.parse(msg.data)
          const currentPrice = parseFloat(priceObject[selectedCoin])
          mergeTickToBar(currentPrice)
          console.log('currentPrice', msg.data)
        }
      }
    }
    return () => {
      if (pricesWs.current) {
        pricesWs.current.close()
        pricesWs.current = null
      }
      chart.remove()
    }
  }, [priceData, selectedCoin])

  useEffect(() => {
    if (selectedCoin) {
      fetchPrice()
    }
  }, [selectedCoin])

  return (
    <Suspense>
      <div className="py-4 bg-[#1D1F22] w-full h-full min-w-[500px] min-h-[300px] rounded-md flex items-center justify-center">
        <div> {error && <h1 className="text-red-500">{error}</h1>}</div>
        <div className="h-full w-full m-4 " ref={chartRef} />
      </div>
    </Suspense>
  )
}

export default Chart
