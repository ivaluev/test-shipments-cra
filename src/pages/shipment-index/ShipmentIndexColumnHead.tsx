import React from 'react'
import { AngleUp, AngleDown } from 'emotion-icons/fa-solid'
import styled from '../../utils/styled'

const _sortBy = 'sortBy'
const _sortDir = 'sortDir'
const _asc = 'asc'
const _des = 'des'

type Props = {
  title: string
  setUrl: () => void
  query: URLSearchParams
}

type Dir = 'asc' | 'des'

export default function ShipmentIndexColumnHead({ title, setUrl, query }: Props) {
  function onClick(dir: Dir) {
    if (query.get(_sortBy) === title && query.get(_sortDir) === dir) {
      query.delete(_sortBy)
      query.delete(_sortDir)
    } else {
      query.set(_sortBy, title)
      query.set(_sortDir, dir)
    }
    setUrl()
  }

  function isActive(dir: Dir): string {
    if (dir === query.get('sortDir')) {
      if (title === query.get('sortBy')) return 'is-active'
    }
    return ''
  }

  return (
    <HeaderWrapper>
      <HeaderLeft>{title}</HeaderLeft>
      <HeaderRight>
        <AngleUp onClick={() => onClick(_asc)} className={isActive(_asc)} />
        <AngleDown onClick={() => onClick(_des)} className={isActive(_des)} />
      </HeaderRight>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding: 0.5em 0;
`

const HeaderLeft = styled('div')`
  flex-grow: 1;
  align-self: center;
`

const HeaderRight = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 12px;
  color: lightgray;
  & > svg:hover {
    color: grey;
    cursor: pointer;
  }
  & > .is-active {
    color: grey;
  }
`
