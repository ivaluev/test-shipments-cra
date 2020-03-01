import React from 'react'
import useModal from '../../components/Modal'
import styled from '../../utils/styled'
import { ButtonPrimary, Button } from '../../components/Buttons'

type Props = {
  children: React.ReactNode
  name: string
}

export default function ShipmentNameModal({ children, name }: Props) {
  const { Modal, open, close } = useModal()

  const save = () => {
    // saving
    close()
  }

  return (
    <>
      <ShipmentNameLink onClick={open}>{children}</ShipmentNameLink>
      <Modal>
        <ModalShell>
          <ModalHeading>Edit Name</ModalHeading>
          <ModalInputWrapper>{name}</ModalInputWrapper>
          <div>
            <ButtonPrimary type="button" onClick={close}>
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

export const ShipmentNameLink = styled('a')`
  color: ${props => props.theme.colors.brand};
  cursor: pointer;
`

const ModalHeading = styled('h1')`
  margin-top: 0;
  margin-bottom: 1em;
`

const ModalInputWrapper = styled('p')`
  margin-bottom: 40px;
  color: #655959;
`

const ModalShell = styled('div')`
  background-color: #fff;
  padding: 50px 100px;
`
