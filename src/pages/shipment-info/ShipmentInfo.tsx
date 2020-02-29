import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../../layout/Container'
import Page from '../../layout/Page'
import styled from '../../utils/styled'
import {
  ShipmentInfobox,
  ShipmentInfoboxInner,
  ShipmentInfoboxHeading,
  ShipmentName,
  ShipmentRoles,
  ShipmentReview
} from './ShipmentInfoHeader'
import { ShipmentStats, StatAttribute, Bullet, ShipmentStatsInner } from './ShipmentInfoStats'
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

  const oldBox = (sh: Shipment) => (
    <>
      <ShipmentInfoboxHeading>
        <ShipmentName>{sh.name}</ShipmentName>
        <ShipmentRoles>
          cargo: <span>{sh.cargo.map(g => g.volume).join(', ')}</span>
        </ShipmentRoles>
        <ShipmentReview>{sh.destination}</ShipmentReview>
      </ShipmentInfoboxHeading>
      <ShipmentStats>
        <ShipmentStatsInner>
          <StatAttribute attr="str" isPrimaryAttr={sh.status === 'str'}>
            <Bullet attr="str" /> {sh.mode || 0}
          </StatAttribute>
          <StatAttribute attr="agi" isPrimaryAttr={sh.status === 'agi'}>
            <Bullet attr="agi" /> {sh.mode || 0}
          </StatAttribute>
          <StatAttribute attr="int" isPrimaryAttr={sh.status === 'int'}>
            <Bullet attr="int" /> {sh.mode || 0}
          </StatAttribute>
        </ShipmentStatsInner>
      </ShipmentStats>
    </>
  )

  useEffect(() => {
    if (id) {
      const fetchRequest = async () => {
        setLoading(true)
        try {
          const res: Shipment = await getShipmentById(id)
          setShipment(res)
        } catch (err) {
          setError(err.toString())
        } finally {
          setLoading(false)
        }
      }
      fetchRequest()
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
                    <ShipmentDetailsAttrName>Destination:</ShipmentDetailsAttrName> {shipment.destination || '-'}
                  </ShipmentDetailsRow>
                  <ShipmentDetailsRow>
                    <ShipmentDetailsAttrName>Total:</ShipmentDetailsAttrName> {shipment.total || '-'}
                  </ShipmentDetailsRow>
                  <ShipmentDetailsRow>
                    <ShipmentDetailsAttrName>Id:</ShipmentDetailsAttrName> {shipment.id || '-'}
                  </ShipmentDetailsRow>
                  <ShipmentDetailsRow>
                    <ShipmentDetailsAttrName>Mode:</ShipmentDetailsAttrName> {shipment.mode || '-'}
                  </ShipmentDetailsRow>
                  <ShipmentDetailsRow>
                    <ShipmentDetailsAttrName>Services:</ShipmentDetailsAttrName>{' '}
                    {shipment.services?.map(l => l.type).join(', ') || '-'}
                  </ShipmentDetailsRow>
                  <ShipmentDetailsRow>
                    <ShipmentDetailsAttrName>Name:</ShipmentDetailsAttrName> {shipment.name || '-'}
                  </ShipmentDetailsRow>
                  <ShipmentDetailsRow>
                    <ShipmentDetailsAttrName>Origin:</ShipmentDetailsAttrName> {shipment.origin || '-'}
                  </ShipmentDetailsRow>
                  <ShipmentDetailsRow>
                    <ShipmentDetailsAttrName>Type:</ShipmentDetailsAttrName> {shipment.type || '-'}
                  </ShipmentDetailsRow>
                </ShipmentDetailsColumn>
                <ShipmentDetailsColumn>
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
