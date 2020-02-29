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

// We can use `typeof` here to map our dispatch types to the props, like so.
export default function ShipmentInfo() {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [shipment, setShipment] = useState<Shipment | null>(null)
  const [error, setError] = useState('')

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
                {/* <ShipmentInfoboxBlurBackground src={`${API_ENDPOINT_IMAGE}/w500${movie.poster_path}`} /> */}
                <ShipmentInfoboxInner>
                  {/* <ShipmentInfoboxImage src={`${API_ENDPOINT_IMAGE}/w500${movie.poster_path}`} /> */}
                  <ShipmentInfoboxHeading>
                    <ShipmentName>{shipment.name}</ShipmentName>
                    <ShipmentRoles>
                      cargo: <span>{shipment.cargo.map(g => g.volume).join(', ')}</span>
                    </ShipmentRoles>
                    <ShipmentReview>{shipment.destination}</ShipmentReview>
                  </ShipmentInfoboxHeading>
                  <ShipmentStats>
                    <ShipmentStatsInner>
                      <StatAttribute attr="str" isPrimaryAttr={shipment.status === 'str'}>
                        <Bullet attr="str" /> {shipment.mode || 0}
                      </StatAttribute>
                      <StatAttribute attr="agi" isPrimaryAttr={shipment.status === 'agi'}>
                        <Bullet attr="agi" /> {shipment.mode || 0}
                      </StatAttribute>
                      <StatAttribute attr="int" isPrimaryAttr={shipment.status === 'int'}>
                        <Bullet attr="int" /> {shipment.mode || 0}
                      </StatAttribute>
                    </ShipmentStatsInner>
                  </ShipmentStats>
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
