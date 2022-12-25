import {shade} from 'polished'
import React, {useEffect, useState} from 'react'
import {updateShipmentName} from '../../api/api'
import {Shipment} from '../../api/types'
import {Button, ButtonPrimary} from '../../components/BrandButtons'
import BrandInput from '../../components/BrandInput'
import {BrandLink} from '../../components/BrandLink'
import BrandLoader from '../../components/BrandLoader'
import useModal from '../../components/Modal'
import styled from '../../services/styled'

type NameFormProps = {
  shipment: Shipment
  setShipment: (sh: Shipment) => void
  close: () => void
}

const NameForm = ({shipment, setShipment, close}: NameFormProps) => {
  const [errorText, setErrorText] = useState<string>()
  const [value, setValue] = useState(shipment.name)
  const [loading, setLoading] = useState(false)

  const save = async () => {
    setLoading(true)
    try {
      const shipmentUpdated = await updateShipmentName(shipment.id, value)
      setShipment(shipmentUpdated)
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert(err.toString())
    } finally {
      setLoading(false)
      close()
    }
  }

  useEffect(() => {
    if (!value) setErrorText('You have to enter some text')
    else setErrorText('')
  }, [value])

  return (
    <FormShell>
      {loading && <BrandLoader />}
      {!loading && (
        <>
          <FormHeading>Edit Name</FormHeading>
          <FormContent>
            <BrandInput
              value={value}
              setValue={setValue}
              placeholder="Enter name"
              errorText={errorText}
            />
          </FormContent>
          <FormActions>
            <ButtonPrimary type="button" onClick={save} disabled={!!errorText}>
              Save
            </ButtonPrimary>
            <Button type="button" onClick={close}>
              Cancel
            </Button>
          </FormActions>
        </>
      )}
    </FormShell>
  )
}

type ModalProps = {
  children: React.ReactNode
  shipment: Shipment
  setShipment: (sh: Shipment) => void
}

export default function ShipmentNameModal({children, shipment, setShipment}: ModalProps) {
  const {Modal, open, close} = useModal()

  return (
    <>
      <BrandLink onClick={open}>{children}</BrandLink>
      <Modal>
        <NameForm shipment={shipment} setShipment={setShipment} close={close} />
      </Modal>
    </>
  )
}

const FormShell = styled('div')`
  background-color: #fff;
  padding: 40px 100px;
  position: relative;
`

const FormHeading = styled('h1')`
  margin-top: 0;
  margin-bottom: 1em;
  color: ${p => shade(0.2, p.theme.colors.brand)};
`

const FormContent = styled('div')`
  min-width: 400px;
  margin-bottom: 15px;
`

const FormActions = styled('div')`
  margin-bottom: 0;
`
