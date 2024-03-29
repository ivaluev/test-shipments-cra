import styled from '@emotion/styled'

export const Button = styled('button')`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  margin-right: 1em;
  border: 1px solid ${props => props.theme.colors.white};
  border-radius: 3px;
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.brand};
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover,
  &:focus {
    border: 1px solid ${props => props.theme.colors.brand};
  }
`

export const ButtonPrimary = styled('button')`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  margin-right: 1em;
  border: 1px solid ${props => props.theme.colors.brand};
  border-radius: 3px;
  background-color: transparent;
  color: ${props => props.theme.colors.brand};
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover,
  &:focus {
    background-color: ${props => props.theme.colors.brand};
    color: ${props => props.theme.colors.white};
  }
`
