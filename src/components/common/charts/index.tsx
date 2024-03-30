'use client'
import React, { useState, useEffect, useRef } from 'react'
import { IChartApi, createChart } from 'lightweight-charts'
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
  const [priceData, setPriceData] = useState<CandleData[] | null>(null)
  const [error, setError] = useState(null)
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
      console.log('response', response.data.entities)
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleCoinChange = () => {
    if (selectedCoin === 'bitcoin') {
      setSelectedCoin('ethereum')
    } else {
      setSelectedCoin('bitcoin')
    }
    fetchPrice()
  }

  const mergeTickToBar = (price: number) => {
    if (currentBar.open === null) {
      currentBar.open = price
      currentBar.high = price
      currentBar.low = price
      currentBar.close = price
    } else {
      currentBar.close = price
      currentBar.high = Math.max(currentBar.high, price)
      currentBar.low = Math.min(currentBar.low, price)
    }
  }

  // lifecycle

  useEffect(() => {
    if (!priceData?.length) return

    if (!pricesWs.current) {
      pricesWs.current = new WebSocket(
        'wss://ws.coincap.io/prices?assets=bitcoin',
      )

      pricesWs.current.onmessage = function (msg) {
        // Update the last candlestick with the live price
        if (msg.data) {
          // convert the price to number which is a string in a float format right now
          const priceObject = JSON.parse(msg.data)
          const currentPrice = parseFloat(priceObject[selectedCoin])
          console.log('currentPrice', currentPrice)
        }
      }
    }

    return () => {
      if (pricesWs.current) {
        pricesWs.current.close()
        pricesWs.current = null
      }
    }
  }, [priceData])

  useEffect(() => {
    console.log('priceData', priceData)
    if (chartRef.current && priceData) {
      const chart = createChart(chartRef.current, chartBaseOptions)
      const candlestickSeries = chart.addCandlestickSeries(
        candleStickChartOptions,
      )
      console.log('candlestickSeries', candlestickSeries)

      candlestickSeries.setData(priceData)
      chart.timeScale().fitContent()

      const handleResize = () => {
        const width = chartRef?.current?.clientWidth ?? 500
        chart.applyOptions({ width })
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)

        chart.remove()
      }
    }
  }, [priceData])

  return (
    <div className="py-4 bg-[#1D1F22] w-full h-full min-w-[500px] min-h-[300px] rounded-md flex items-center justify-center">
      <div> {error && <h1 className="text-red-500">{error}</h1>}</div>
      <Button onClick={handleCoinChange}>Bitcopin</Button>
      <div className="h-full w-full m-4 " ref={chartRef} />
    </div>
  )
}

export default Chart
