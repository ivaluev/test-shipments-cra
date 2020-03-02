import styled from '../../services/styled'

export const TableWrapper = styled('div')`
  position: relative;
  /* max-width: ${props => props.theme.widths.md};
  margin: 0 auto;
  min-height: 200px; */
`

export const ShipmentLoading = styled('tr')`
  td {
    height: 48px;
    text-align: center;
    font-size: larger;
  }
`

export const ShipmentIndexDetail = styled('td')`
  display: flex;
  /* flex-direction: center; */
  /* align-items: center; */
  flex-direction: column;
  justify-content: center;
`

export const ShipmentIcon = styled('img')`
  width: 32px;
  height: 32px;
`

export const ShipmentIconPh = styled('div')`
  width: 32px;
  height: 32px;
`

export const ShipmentName = styled('div')`
  /* flex: 1 1 auto; */
  /* height: 100%; */
  /* margin-left: 1rem; */

  a {
    color: ${props => props.theme.colors.brand};
  }
`
