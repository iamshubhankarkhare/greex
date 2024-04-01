import { useContext } from 'react'
import { SearchContext } from '@/contexts/panelSearchInput'

export const useSearchContext = () => {
  const context = useContext(SearchContext)
  console.log(SearchContext)

  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider')
  }

  return context
}