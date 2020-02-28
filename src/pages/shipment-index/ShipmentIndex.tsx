import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getShipments, getShipmentsById } from '../../api/api'
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

export default function MovieIndex() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Shipment[]>([])
  const [resultsPages, setResultsPages] = useState(1)
  const [error, setError] = useState<string>('')

  // we assume that change in the query re-render our com
  const history = useHistory()
  const query = useQuery()
  const search = query.get('search') || ''
  const page = parseInt(query.get('page') || '1', 10)

  // we use router url state management to maintain state in the url
  const searchReset = () => history.push('/shipments')
  const setUrlTo = (s: string, p: number) => history.push(`/shipments?page=${p}&search=${s}`)
  const setPage = (newPage: number) => setUrlTo(search, newPage)
  const setSearch = (newSearch: string) => setUrlTo(newSearch, 1)
  const setSorting = (col: string, dir: string) => alert('sdsd')

  const columns = ['Id', 'Origin', 'Destination', 'Status'].map(c => <ShipmentIndexColumnHead title={c} applySoring={setSorting} />)

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
          <ShipmentIndexSearch search={search} setSearch={setSearch} resetSearch={searchReset} />
          {renderData()}
          {error && <ErrorMsg>{error} :(</ErrorMsg>}
        </TableWrapper>
        <ShipmentIndexPager page={page} pagesTotal={resultsPages} setPage={setPage} />
      </Container>
    </Page>
  )
}
