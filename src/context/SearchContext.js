import React from 'react'

const SearchContext = React.createContext({
  searchInput: '',
  onChangeSearchInput: () => {},
  onResetSearchInput: () => {},
})

export default SearchContext
