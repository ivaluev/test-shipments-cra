import styled from '@emotion/styled'
import {faSearch, faTimes} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import {desaturate} from "polished"
import {useState} from "react"

import brandColors from '../../theme/colors/brandColors'

const _search = 'search'
const _page = 'page'

const setSearchState = (fn: () => void) => fn()
const setSearchStateDebounced = AwesomeDebouncePromise(setSearchState, 1200)

const colorInactive = desaturate(0.7, brandColors.red)
const colorActive = brandColors.red

type ShipmentIndexSearchProps = {
  query: URLSearchParams
  setUrl: () => void
}

export const ShipmentIndexSearch = ({query, setUrl}: ShipmentIndexSearchProps) => {
  const search = query.get(_search) || ''

  const [searchLocal, setSearchLocal] = useState(search)
  const [searchIsActive, setSearchIsActive] = useState(false)

  const setSearch = (newSearch: string) => {
    query.set(_search, newSearch)
    query.set(_page, '1')
    setUrl()
  }

  const resetSearch = () => {
    query.delete(_search)
    query.set(_page, '1')
    setUrl()
  }

  const onChange = (value: string) => {
    setSearchLocal(value)
    // we are quit until get 3 letters from user
    if (value && value.length > 1) {
      setSearchStateDebounced(() => setSearch(value))
    }
    if (!value) {
      setSearch('')
    }
  }
  const clearSearch = () => {
    setSearchLocal('')
    resetSearch()
  }

  return (
    <SearchContainer style={{backgroundColor: searchIsActive ? '#e5e5e3' : ''}}>
      <SearchIcon icon={faSearch} color={searchIsActive ? colorActive : colorInactive} />
      <SearchInput
        type="text"
        placeholder="Search any text...  (not less than 2 characters)"
        value={searchLocal || ''}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setSearchIsActive(true)}
        onBlur={() => setSearchIsActive(false)}
      />
      {searchLocal && searchLocal.length && (
        <IconClose
          icon={faTimes}
          onClick={clearSearch}
          // style={{ visibility: searchLocal && searchLocal.length ? 'visible' : 'hidden' }}
        />
      )}
    </SearchContainer>
  )
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  align-items: center;
  /* background-color: whitesmoke; */
`

const SearchIcon = styled(FontAwesomeIcon)`
  width: 25px !important;
  height: 25px;
  margin-right: 10px;
  margin-left: 20px;
`

const IconClose = styled(FontAwesomeIcon)`
  width: 25px !important;
  height: 25px;
  margin-right: 18px;
  margin-left: 18px;
  color: #a89898ad;
  cursor: pointer;
  &:hover {
    color: #eb5558;
  }
`

const SearchInput = styled.input`
  flex-grow: 1;
  border: none;
  width: 100%;
  height: 48px;
  padding-left: 5px;
  background-color: transparent;
  &:focus {
    outline-width: 0;
  }
`
