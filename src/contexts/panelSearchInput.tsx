'use client'
import React, { createContext, useState } from 'react'

export const SearchContext = createContext<{
  searchInput: string
  setSearchInput: React.Dispatch<React.SetStateAction<string>>
}>({
  searchInput: '',
  setSearchInput: () => {},
})

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchInput, setSearchInput] = useState('')

  return (
    <SearchContext.Provider value={{ searchInput, setSearchInput }}>
      {children}
    </SearchContext.Provider>
  )
}
