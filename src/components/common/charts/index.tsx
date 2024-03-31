'use client'
import React, { useState, useEffect, useRef } from 'react'
import { ISeriesApi, createChart } from 'lightweight-charts'
import {
  candleStickChartOptions,
  chartBaseOptions,
} from '@/constants/basicChartConfig'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { CandleData } from '@/types/candleStickChart'

const Chart = () => {
  // states
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
    console.log('fetchPrice')
    try {
      const response = await axios.get(
        `/api/getHistoricalPrices?coin=${selectedCoin}`,
      )
      setPriceData(response.data.entities)
      console.log('response', response.data.entities)
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
    console.log('priceData', priceData)
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
        // Update the last candlestick with the live price
        if (msg.data) {
          const priceObject = JSON.parse(msg.data)
          const currentPrice = parseFloat(priceObject[selectedCoin])
          console.log('currentPrice', currentPrice)
          mergeTickToBar(currentPrice)
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
  }, [priceData])

  useEffect(() => {
    fetchPrice()
    console.log('mounted')
  }, [])

  return (
    <div className="py-4 bg-[#1D1F22] w-full h-full min-w-[500px] min-h-[300px] rounded-md flex items-center justify-center">
      <div> {error && <h1 className="text-red-500">{error}</h1>}</div>
      {selectedCoin === 'bitcoin' ? (
        <h1 className="text-white">Bitcoin</h1>
      ) : (
        <h1 className="text-white">Ethereum</h1>
      )}
      <div className="h-full w-full m-4 " ref={chartRef} />
    </div>
  )
}

export default Chart
