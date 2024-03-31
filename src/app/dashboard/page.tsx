import React from 'react'
import Chart from '@/components/common/charts/index'
import CoinList from '@/components/common/lists/coinList'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

async function Dashboard() {
  return (
    <div className=" h-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border w-full"
      >
        <ResizablePanel defaultSize={20} className="m-4">
          <div className="flex items-center justify-center h-full">
            <CoinList />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={80}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={80}>
              <div className="flex items-center justify-center p-6 h-full">
                {/* <Chart /> */}
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
