'use client'
import React, { useEffect, useState, ReactNode } from 'react'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TrendingCoinList from '@/components/common/lists/trendingCoinList'
import AllCoinList from '@/components/common/lists/allCoinList'
import useDebounce from '@/hooks/useDebounce'

const ListWrapper = () => {
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearchInput = useDebounce(searchInput, 200)

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchInput(event.target.value)
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row justify-between w-full rounded-lg p-1">
        <Input
          placeholder="Search"
          value={searchInput}
          onChange={handleSearchInputChange}
          className="rounded-lg"
        />
      </div>
      <Tabs defaultValue="trending" className="w-full p-1 mt-2 h-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="trending">🔥 Trending</TabsTrigger>
          <TabsTrigger value="all">🌐 All</TabsTrigger>
        </TabsList>
        <TabsContent value="trending" className="h-full">
          <div className="flex flex-col w-full h-full mt-4">
            <TrendingCoinList searchInput={debouncedSearchInput} />
          </div>
        </TabsContent>
        <TabsContent value="all" className="h-full">
          <div className="flex flex-col w-full h-full mt-4">
            <AllCoinList searchInput={debouncedSearchInput} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ListWrapper
