import React, { useState } from 'react'
import useModal from '../../components/Modal'
import styled from '../../utils/styled'
import { ButtonPrimary, Button } from '../../components/BrandButtons'
import { BrandLink } from '../../components/BrandLink'
import BrandInput from '../../components/BrandInput'

type Props = {
  children: React.ReactNode
  name: string
}

export default function ShipmentNameModal({ children, name }: Props) {
  const [value, setValue] = useState(name)
  const [errorText, setErrorText] = useState<string>()
  const { Modal, open, close } = useModal()

  const save = () => {
    if (!errorText) {
      alert(`saving ${value}`)
      close()
    }
  }

  return (
    <>
      <BrandLink onClick={open}>{children}</BrandLink>
      <Modal>
        <ModalShell>
          <ModalHeading>Edit Name</ModalHeading>
          <ModalInputWrapper>
            <BrandInput value={value} setValue={setValue} placeholder="enter name" errorText={errorText} />
          </ModalInputWrapper>
          <div>
            <ButtonPrimary type="button" onClick={save}>
              Save
            </ButtonPrimary>
            <Button type="button" onClick={close}>
              Cancel
            </Button>
          </div>
        </ModalShell>
      </Modal>
    </>
  )
}

const ModalHeading = styled('h1')`
  margin-top: 0;
  margin-bottom: 1em;
`

const ModalInputWrapper = styled('div')`
  min-width: 400px;
  margin-bottom: 50px;
  color: #655959;
`

const ModalShell = styled('div')`
  background-color: #fff;
  padding: 40px 100px;
`
