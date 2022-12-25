import styled from '@emotion/styled'
import {ReactNode} from 'react'
import {Pages} from '../pages'
import {Header} from './Header'

interface RootProps {
  children?: ReactNode
}

export const Root = () => (
  <Wrapper>
    <Header title="Shipments Client Portal" />
    <Pages />
  </Wrapper>
)

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.body};
  font-family: ${props => props.theme.fonts.body};
`
