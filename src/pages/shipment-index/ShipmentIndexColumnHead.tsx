import styled from '@emotion/styled'
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {lighten} from 'polished'
import {SORT_BY, SORT_ORDER, SORT_ORDER_ASC, SORT_ORDER_DESC} from '../../api/types'

type Props = {
  title: string
  setUrl: () => void
  query: URLSearchParams
}

type Dir = typeof SORT_ORDER_ASC | typeof SORT_ORDER_DESC

export default function ShipmentIndexColumnHead({title, setUrl, query}: Props) {
  function onClick(dir: Dir) {
    if (query.get(SORT_BY) === title && query.get(SORT_ORDER) === dir) {
      query.delete(SORT_BY)
      query.delete(SORT_ORDER)
    } else {
      query.set(SORT_BY, title)
      query.set(SORT_ORDER, dir)
    }
    setUrl()
  }

  function isActive(dir: Dir): string {
    if (dir === query.get(SORT_ORDER)) {
      if (title === query.get(SORT_BY)) return 'is-active'
    }
    return ''
  }

  return (
    <HeaderWrapper>
      <HeaderLeft>{title}</HeaderLeft>
      <HeaderRight>
        <AngleIcon
          icon={faAngleUp}
          onClick={() => onClick(SORT_ORDER_ASC)}
          className={isActive(SORT_ORDER_ASC)}
        />
        <AngleIcon
          icon={faAngleDown}
          onClick={() => onClick(SORT_ORDER_DESC)}
          className={isActive(SORT_ORDER_DESC)}
        />
      </HeaderRight>
    </HeaderWrapper>
  )
}

const AngleIcon = styled(FontAwesomeIcon)`
  width: 19px !important;
  height: 19px;
  &:hover {
    color: ${p => p.theme.colors.brand};
    cursor: pointer;
  }
`

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
  & > .is-active {
    color: ${p => lighten(0.1, p.theme.colors.brand)};
  }
`
