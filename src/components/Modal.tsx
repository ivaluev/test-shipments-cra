import styled from '@emotion/styled'
import React, {useState} from 'react'
import {createPortal} from 'react-dom'

const ModalContainer = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalDimmer = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100000;
`

const ModalContent = styled('div')`
  position: relative;
  z-index: 100001;
`

type PropsCh = {
  children: React.ReactNode
}

type Props = {
  isOpen: boolean
  close: () => void
  elementId?: string
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const modalRoot: Element = document.getElementById('modal-root')!

const ModalBase = ({children, isOpen = false, close}: PropsCh & Props) => {
  if (isOpen === false) {
    return null
  }
  return createPortal(
    <ModalContainer>
      <ModalDimmer onClick={close} />
      <ModalContent>{children}</ModalContent>
    </ModalContainer>,
    modalRoot
  )
}

const useModal = () => {
  const [isOpen, setOpen] = useState(false)

  const open = () => setOpen(true)

  const close = () => setOpen(false)

  const Modal = ({children}: PropsCh) => (
    <ModalBase isOpen={isOpen} close={close}>
      {children}
    </ModalBase>
  )

  return {Modal, open, close, isOpen}
}

export default useModal
