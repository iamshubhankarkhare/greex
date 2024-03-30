'use client'
import React, { useEffect, useRef } from 'react'
import { createChart, ColorType } from 'lightweight-charts'
import {
  candleStickChartOptions,
  chartBaseOptions,
} from '@/constants/basicChartConfig'

const Chart = ({ data }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    if (data && chartRef.current) {
      console.log('data', data)
      const chart = createChart(chartRef.current, chartBaseOptions)
      const candlestickSeries = chart.addCandlestickSeries(
        candleStickChartOptions,
      )

      const mockData = [
        {
          time: '2019-01-01',
          open: 75.16,
          high: 82.84,
          low: 36.16,
          close: 45.72,
        },
      ]
      // Generate additional 50 objects
      for (let i = 1; i <= 50; i++) {
        const baseDate = new Date('2019-01-02')
        const daysToAdd = i
        const newDate = new Date(
          baseDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000,
        ) // Add one day for each iteration
        const formattedDate = newDate.toISOString().slice(0, 10) // Format date as YYYY-MM-DD
        const open = Math.random() * (150 - 110) + 110 // Random open price between 110 and 150
        // Random high price but not negative
        const high = Math.max(open + Math.random() * (15 - 5) + 5, 0)
        // Random low price slightly lower than open, but not negative
        const low = Math.max(open - Math.random() * (15 - 5) + 5, 0)
        // random close price between low and high
        const close = Math.random() * (high - low) + low
        mockData.push({
          time: formattedDate,
          open,
          high,
          low,
          close,
        })
      }

      candlestickSeries.setData(mockData)
      chart.timeScale().fitContent()

      const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth })
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)

        chart.remove()
      }
    }
  }, [data])

  return (
    <div className="py-4 bg-[#1D1F22] w-full h-full min-w-[500px] min-h-[300px] rounded-md flex items-center justify-center">
      <div className="h-full w-full m-4 " ref={chartRef} />
    </div>
  )
}

export default Chart
