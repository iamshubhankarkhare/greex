import React from 'react'
import Chart from '@/components/common/charts/index'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

async function Dashboard() {
  const data = [
    { time: '2018-12-22', value: 32.51 },
    { time: '2018-12-23', value: 31.11 },
    { time: '2018-12-24', value: 27.02 },
    { time: '2018-12-25', value: 27.32 },
    { time: '2018-12-26', value: 25.17 },
    { time: '2018-12-27', value: 28.89 },
    { time: '2018-12-28', value: 25.46 },
    { time: '2018-12-29', value: 23.92 },
    { time: '2018-12-30', value: 22.68 },
    { time: '2018-12-31', value: 22.67 },
  ]

  return (
    <div className=" h-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border w-full"
      >
        <ResizablePanel defaultSize={15}>
          <div className="flex items-center justify-center p-6">
            <span className="font-semibold">Panel</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={85}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={80}>
              <div className="flex items-center justify-center p-6 h-full">
                <Chart data={data} />
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={20}>
              <div className="flex items-center justify-center p-6">
                <span className="font-semibold">Order book</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default Dashboard
