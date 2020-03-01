import React, { CSSProperties } from 'react'
import styled from '../utils/styled'

type Props = {
  placeholder: string
  errorText: string | undefined
  value: string
  setValue: (value: string) => void
}

export default function BrandInput({ value, placeholder, errorText, setValue }: Props) {
  const fieldError = errorText ? <BrandInputError>{errorText}</BrandInputError> : null
  const errorStyle: CSSProperties = { borderBottomColor: '#ce1313' }

  return (
    <div>
      <BrandInputBase
        style={errorText ? errorStyle : undefined}
        placeholder={placeholder}
        value={value}
        type="text"
        onChange={e => setValue(e.target.value)}
        // onChange={(e: React.FormEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
      />
      {fieldError}
    </div>
  )
}

const BrandInputBase = styled('input')`
  border-bottom-color: rgba(0, 0, 0, 0.2);
  border-bottom-width: 1px;
  border-bottom-style: solid;
  padding: 5px;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  width: 100%;
  font-size: 18px;

  &:focus {
    outline: none;
    border-bottom-color: #00afcc;
    border-bottom-width: 2px;
  }
`

const BrandInputError = styled('div')`
  color: #ce1313;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
`
