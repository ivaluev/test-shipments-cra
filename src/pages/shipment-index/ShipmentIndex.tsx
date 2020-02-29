import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { DataPage, Shipment } from '../../api/types'
import DataTable from '../../components/DataTable'
import ErrorMsg from '../../components/ErrorMessage'
import Container from '../../layout/Container'
import { Loading } from '../../layout/Loading'
import Page from '../../layout/Page'
import { useQuery } from '../../utils/hooks'
import { ShipmentLoading, ShipmentName, TableWrapper } from './ShipmentIndexItem'
import ShipmentIndexPager from './ShipmentIndexPager'
import { ShipmentIndexSearch } from './ShipmentIndexSearch'
import ShipmentIndexColumnHead from './ShipmentIndexColumnHead'
import { getShipments } from '../../api/api'

export default function MovieIndex() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Shipment[]>([])
  const [resultsPages, setResultsPages] = useState(1)
  const [error, setError] = useState<string>('')
  const history = useHistory()

  const query = useQuery() // state
  const setUrl = () => history.push(`/shipments?${query.toString()}`) // dispatch

  const columns = ['Id', 'Origin', 'Destination', 'Status'].map(c => (
    <ShipmentIndexColumnHead title={c} setUrl={setUrl} query={query} />
  ))

  useEffect(() => {
    const loadFn = async () => {
      setLoading(true)
      try {
        const result: DataPage = await getShipments(query)
        setResults(result.items)
        setResultsPages(result.pagesTotal)
      } catch (err) {
        setError(err.toString())
      } finally {
        setLoading(false)
      }
    }
    loadFn()
  }, [query.toString()])

  function renderData() {
    return (
      <DataTable columns={columns} widths={['', 'auto', '', '']}>
        {loading && results.length === 0 && (
          <ShipmentLoading>
            <td colSpan={4}>Loading...</td>
          </ShipmentLoading>
        )}
        {results.map(sh => (
          <tr key={sh.id}>
            <td>{sh.id}</td>
            <td>
              <ShipmentName>
                <Link to={`/shipments/${sh.id}`}>{sh.origin}</Link>
              </ShipmentName>
            </td>
            <td>{sh.destination}</td>
            <td>{sh.status || 0}</td>
          </tr>
        ))}
      </DataTable>
    )
  }

  return (
    <Page>
      <Container>
        <TableWrapper>
          <Loading loading={loading} />
          <ShipmentIndexSearch query={query} setUrl={setUrl} />
          {renderData()}
          {error && <ErrorMsg>{error} :(</ErrorMsg>}
        </TableWrapper>
        <ShipmentIndexPager pagesTotal={resultsPages} setUrl={setUrl} query={query} />
      </Container>
    </Page>
  )
}
