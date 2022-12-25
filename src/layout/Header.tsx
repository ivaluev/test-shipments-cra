import styled from '@emotion/styled'
import {NavLink} from 'react-router-dom'
import Container from './Container'

interface HeaderProps {
  title: string
}

export const Header = ({title}: HeaderProps) => (
  <Wrapper>
    <HeaderInner>
      <HeaderLeft>
        <Title>{title}</Title>
      </HeaderLeft>
      <HeaderNav>
        <HeaderNavLink
          to="/shipments"
          className={({isActive}) => (isActive ? 'is-active' : undefined)}
        >
          Shipments
        </HeaderNavLink>
        <HeaderNavLink to="/about" className={({isActive}) => (isActive ? 'is-active' : undefined)}>
          About
        </HeaderNavLink>
      </HeaderNav>
      <HeaderRight>
        <CurrentTheme>for FreightHub</CurrentTheme>
      </HeaderRight>
    </HeaderInner>
  </Wrapper>
)

const Wrapper = styled.header`
  padding: 0.5rem 1.5rem;
  background-color: ${props => props.theme.colors.brand};
  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fonts.headings};
`

const HeaderInner = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    flex-direction: row;
  }
`

const HeaderLeft = styled.div`
  padding-right: 2rem;
`

const HeaderNav = styled.nav`
  flex: 1 1 auto;
  margin: 1rem 0;

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    margin: 0;
  }
`

const HeaderNavLink = styled(NavLink)`
  margin: 0 1rem;

  &.is-active {
    text-decoration: underline;
  }
`

const HeaderRight = styled('div')`
  padding-left: 1rem;
`

const Title = styled('h2')`
  margin: 0;
  font-weight: 500;
`

const CurrentTheme = styled('span')`
  margin-right: 1rem;
`
