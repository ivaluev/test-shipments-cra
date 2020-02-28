import React from 'react'
import { AngleUp, AngleDown } from 'emotion-icons/fa-solid'
import styled from '../../utils/styled'

type Props = {
  title: string
  applySoring: (col: string, dir: string) => void
}

export default function ShipmentIndexColumnHead({ title, applySoring }: Props) {
  function onClick(dir: 'asc' | 'des') {
    applySoring(title, dir)
  }

  return (
    <HeaderWrapper>
      <HeaderLeft>{title}</HeaderLeft>
      <HeaderRight>
        <AngleUp onClick={() => onClick('asc')} />
        <AngleDown onClick={() => onClick('des')} />
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
`
