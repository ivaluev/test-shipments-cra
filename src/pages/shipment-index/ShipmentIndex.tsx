import {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {getShipments} from '../../api/api'
import {DataPage, Shipment} from '../../api/types'
import DataTable from '../../components/DataTable'
import ErrorMsg from '../../components/ErrorMessage'
import Container from '../../layout/Container'
import {Loading} from '../../layout/Loading'
import Page from '../../layout/Page'
import {useQuery} from '../../services/hooks'
import ShipmentIndexColumnHead from './ShipmentIndexColumnHead'
import {ShipmentLoading, ShipmentName, TableWrapper} from './ShipmentIndexItem'
import ShipmentIndexPager from './ShipmentIndexPager'
import {ShipmentIndexSearch} from './ShipmentIndexSearch'

export default function MovieIndex() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Shipment[]>([])
  const [resultsPages, setResultsPages] = useState(1)
  const [error, setError] = useState<string>('')
  const history = useHistory()

  const query = useQuery() // state
  const setUrl = () => history.push(`/shipments?${query.toString()}`) // dispatch

  const columns = ['Id', 'Name', 'Origin', 'Destination', 'Status'].map(c => (
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

  const table = (
    <TableWrapper>
      <Loading loading={loading} />
      <ShipmentIndexSearch query={query} setUrl={setUrl} />
      <DataTable columns={columns} widths={['', 'auto', '', '', '']}>
        {loading && results.length === 0 && (
          <ShipmentLoading>
            <td colSpan={5}>Loading...</td>
          </ShipmentLoading>
        )}
        {results.map(sh => (
          <tr key={sh.id}>
            <td>{sh.id}</td>
            <td>
              <ShipmentName>
                <Link to={`/shipments/${sh.id}`}>{sh.name}</Link>
              </ShipmentName>
            </td>
            <td>{sh.origin}</td>
            <td>{sh.destination}</td>
            <td>{sh.status || 0}</td>
          </tr>
        ))}
      </DataTable>
      <ShipmentIndexPager pagesTotal={resultsPages} setUrl={setUrl} query={query} />
    </TableWrapper>
  )

  return (
    <Page>
      <Container>{error ? <ErrorMsg>{error} :(</ErrorMsg> : table}</Container>
    </Page>
  )
}
