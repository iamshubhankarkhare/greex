import React, { Suspense } from 'react'
import Chart from '@/components/common/charts/index'
import ListWrapper from '@/components/common/lists/listWrapper'
import OrderBlockTable from '@/components/orderBlock/table'
import CoinBanner from '@/components/coin/coinBanner'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

async function Dashboard() {
  return (
    <div className=" h-full flex flex-col">
      <Suspense>
        <CoinBanner />
      </Suspense>
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border w-full h-full"
      >
        <ResizablePanel defaultSize={20} className="m-4">
          <div className="flex items-center justify-center h-full mb-10">
            <Suspense>
              <ListWrapper />
            </Suspense>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={80}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={75}>
              <Suspense>
                <div className="flex items-center justify-center p-6 h-full">
                  {/* <Chart /> */}
                </div>
              </Suspense>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={30}>
              <div className="flex items-center justify-center p-6 mb-10">
                <OrderBlockTable />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default Dashboard
