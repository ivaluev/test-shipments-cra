import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Page from '../../layout/Page'
import Container from '../../layout/Container'
import DataTable from '../../components/DataTable'
import { Loading } from '../../layout/Loading'
import { getShipmentsById, getShipments } from '../../api/api'
import { ShipmentLoading, ShipmentIndexDetail, TableWrapper, ShipmentName } from './ShipmentIndexItem'
import ShipmentIndexPager from './ShipmentIndexPager'
import { useQuery } from '../../utils/hooks'
import { DataPage, Shipment } from '../../api/types'
import { ShipmentIndexSearch } from './ShipmentIndexSearch'
import styled, { Theme } from '../../utils/styled'
import ErrorMsg from '../../components/ErrorMessage'

export default function MovieIndex() {
  // we assume that change in the query re-render our com
  const history = useHistory()
  const query = useQuery()
  const search = query.get('search') || ''
  const page = parseInt(query.get('page') || '1', 10)

  // state
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Shipment[]>([])
  const [resultsPages, setResultsPages] = useState(1)
  const [error, setError] = useState<string>('')

  // actions
  const redirectTo = (s: string, p: number) => history.push(`/shipments?page=${p}&search=${s}`)
  const setPageAction = (newPage: number) => redirectTo(search, newPage)
  const setSearchAction = (newSearch: string) => redirectTo(newSearch, 1)
  const searchReset = () => history.push('/shipments')

  useEffect(() => {
    const fetch = search ? getShipmentsById : getShipments
    const loadFn = async () => {
      setLoading(true)
      try {
        const result: DataPage = await fetch(page, search)
        setResults(result.items)
        setResultsPages(result.pagesTotal)
      } catch (err) {
        setError(err.toString())
      } finally {
        setLoading(false)
      }
    }
    loadFn()
  }, [search, page])

  function renderData() {
    return (
      <DataTable columns={['Id', 'Origin', 'Destination', 'Status']} widths={['', 'auto', '', '']}>
        {loading && results.length === 0 && (
          <ShipmentLoading>
            <td colSpan={3}>Loading...</td>
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
          <ShipmentIndexSearch search={search} setSearch={setSearchAction} resetSearch={searchReset} />
          {renderData()}
          {error && <ErrorMsg>{error} :(</ErrorMsg>}
        </TableWrapper>
        <ShipmentIndexPager page={page} pagesTotal={resultsPages} setPage={setPageAction} />
      </Container>
    </Page>
  )
}
