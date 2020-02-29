import { darken, linearGradient } from 'polished'
import styled from '../../utils/styled'

export const ShipmentInfobox = styled('div')`
  /* ${linearGradient({
    colorStops: ['#00FFFF 0%', 'rgba(0, 0, 255, 0) 50%', '#0000FF 95%'],
    toDirection: 'to top right',
    fallback: '#FFF'
  })} */
  position: relative;
  /* background: rgba(0, 0, 0, 0.5); */
  background: rgb(182,182,182);
  background: linear-gradient(30deg, rgba(20,20,20,1) 0%, rgba(70,70,70,1) 30%, rgba(182,182,182,1) 100%);
  overflow: hidden;
  border-radius: 8px;
  color: ${props => darken(0.25, props.theme.colors.white)};
`
export const ShipmentInfoboxBlurBackground = styled('img')`
  position: absolute;
  top: -12.5%;
  left: -12.5%;
  width: 125%;
  height: 125%;
  filter: blur(25px);
  object-fit: cover;
  opacity: 0.35;
  background-repeat: no-repeat;
  z-index: 1;
`

export const ShipmentInfoboxInner = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 3rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 125px inset;
  z-index: 2;

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    flex-direction: row;
  }
`

export const ShipmentInfoboxImage = styled('img')`
  display: block;
  flex-shrink: 0;
  width: 180px;
  height: 128px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 12px 32px;
  object-fit: cover;
  border-radius: 16px;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.3);
  border-image: initial;
`

export const ShipmentInfoboxHeading = styled('div')`
  flex: 1 1 100%;
  margin: 1.5rem 0 0;
  text-align: center;

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    margin: 0 1.5rem;
    text-align: left;
  }
`

export const ShipmentName = styled('h1')`
  margin: 0;
  color: ${props => props.theme.colors.white};
  font-weight: 500;
`

export const ShipmentRoles = styled('p')`
  margin: 0.5rem 0 0;
  color: ${props => props.theme.colors.white};
  font-size: 0.8rem;
  letter-spacing: 1px;
  text-transform: uppercase;

  & span {
    color: ${props => darken(0.25, props.theme.colors.white)};
  }
`

export const ShipmentReview = styled.p`
  font-size: 0.8rem;
`
