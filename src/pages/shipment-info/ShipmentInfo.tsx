import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../../layout/Container'
import Page from '../../layout/Page'
import styled from '../../services/styled'
import { ShipmentInfobox, ShipmentInfoboxInner } from './ShipmentInfoHeader'
import {
  ShipmentDetails,
  ShipmentDetailsColumn,
  ShipmentDetailsRow,
  ShipmentDetailsAttrName
} from './ShipmentInfoDetails'
import { Loading } from '../../layout/Loading'
import { getShipmentById } from '../../api/api'
import { Shipment } from '../../api/types'
import ErrorMsg from '../../components/ErrorMessage'
import ShipmentInfoPath, { Step, StepStatusEnum } from './ShipmentInfoPath'
import ShipmentNameModal from './ShipmentNameModal'

// We can use `typeof` here to map our dispatch types to the props, like so.
export default function ShipmentInfo() {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [shipment, setShipment] = useState<Shipment | null>(null)
  const [error, setError] = useState('')

  const steps: Step[] = [
    new Step(shipment?.origin || 'Point 1', StepStatusEnum.EXECUTING, StepStatusEnum.EXECUTING),
    new Step(shipment?.destination || 'Point 2', StepStatusEnum.PENDING)
  ]

  const fetchRequest = async (sid: string) => {
    setLoading(true)
    try {
      const res: Shipment = await getShipmentById(sid)
      setShipment(res)
    } catch (err) {
      setError(err.toString())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchRequest(id)
    }
  }, [id])

  return (
    <Page>
      <Container>
        <Wrapper>
          <Loading loading={loading} />
          {shipment && (
            <>
              <ShipmentInfobox>
                <ShipmentInfoboxInner>
                  <ShipmentInfoPath data={steps} />
                </ShipmentInfoboxInner>
              </ShipmentInfobox>
              <ShipmentDetails>
                <ShipmentDetailsColumn>
                  <ShipmentDetailsRow>
                    <ShipmentDetailsAttrName>Name:</ShipmentDetailsAttrName>{' '}
                    <ShipmentNameModal shipment={shipment} setShipment={setShipment}>
                      {shipment.name || '-'}
                    </ShipmentNameModal>
                  </ShipmentDetailsRow>
                  <ShipmentDetailsRow>
                    <ShipmentDetailsAttrName>Origin:</ShipmentDetailsAttrName> {shipment.origin || '-'}
                  </ShipmentDetailsRow>
                  <ShipmentDetailsRow>
                    <ShipmentDetailsAttrName>Destination:</ShipmentDetailsAttrName> {shipment.destination || '-'}
                  </ShipmentDetailsRow>
                  <ShipmentDetailsRow>
                    <ShipmentDetailsAttrName>Total:</ShipmentDetailsAttrName> {shipment.total || '-'}
                  </ShipmentDetailsRow>
                </ShipmentDetailsColumn>
                <ShipmentDetailsColumn>
                  <ShipmentDetailsRow>
                    <ShipmentDetailsAttrName>Mode:</ShipmentDetailsAttrName> {shipment.mode || '-'}
                  </ShipmentDetailsRow>
                  <ShipmentDetailsRow>
                    <ShipmentDetailsAttrName>Services:</ShipmentDetailsAttrName>{' '}
                    {shipment.services?.map(l => l.type).join(', ') || '-'}
                  </ShipmentDetailsRow>
                  <ShipmentDetailsRow>
                    <ShipmentDetailsAttrName>Type:</ShipmentDetailsAttrName> {shipment.type || '-'}
                  </ShipmentDetailsRow>
                  <ShipmentDetailsRow>
                    <ShipmentDetailsAttrName>UserId:</ShipmentDetailsAttrName>
                    {shipment.userId}
                  </ShipmentDetailsRow>
                </ShipmentDetailsColumn>
              </ShipmentDetails>
            </>
          )}
          {error && <ErrorMsg>{error}</ErrorMsg>}
        </Wrapper>
      </Container>
    </Page>
  )
}

const Wrapper = styled('div')`
  position: relative;
`
