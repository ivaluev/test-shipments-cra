import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Page from '../../layout/Page'
import Container from '../../layout/Container'
import DataTable from '../../components/DataTable'
import { Loading } from '../../layout/Loading'
import { getShipments } from '../../api/api'
import { MovieIndexItem, ApiResponseSearch } from './types'
import { MovieLoading, MovieIndexDetail, MovieIcon, TableWrapper, MovieName, MovieIconPh } from './ShipmentIndexItem'
import { MovieSearchBox } from './ShipmentIndexSearch'
import MovieIndexPager from './ShipmentIndexPager'
import { useQuery } from '../../utils/hooks'

export default function MovieIndex() {
  // we assume that change in the query re-render our com
  const history = useHistory()
  const query = useQuery()
  const search = query.get('search') || ''
  const page = parseInt(query.get('page') || '1', 10)

  // state
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<MovieIndexItem[]>([])
  const [resultsPages, setResultsPages] = useState(1)
  const [error, setError] = useState<string>('')

  // actions
  const setPageAction = (newPage: number) => history.push(`/movies?search=${search}&page=${newPage}`)
  const setSearchAction = (newSearch: string) => history.push(`/movies?search=${newSearch}&page=1`)
  const searchReset = () => history.push('/movies')

  useEffect(() => {
    if (search) {
      const searchUrl = getSearchUrl(search, page)
      const searchFn = async () => {
        setLoading(true)
        try {
          const result: ApiResponseSearch = await callApi('get', searchUrl)
          setResults(result.results)
          setResultsPages(result.total_pages)
        } catch (err) {
          setError(err.toString())
        } finally {
          setLoading(false)
        }
      }
      searchFn()
    } else {
      setResults([])
      setResultsPages(0)
    }
  }, [search, page])

  function renderData() {
    return (
      <DataTable columns={['Movie', 'Release Date', 'Popularity']} widths={['auto', '', '']}>
        {loading && results.length === 0 && (
          <MovieLoading>
            <td colSpan={3}>Loading...</td>
          </MovieLoading>
        )}
        {results.map(movie => (
          <tr key={movie.id}>
            <MovieIndexDetail>
              {movie.poster_path && <MovieIcon src={`${API_ENDPOINT_IMAGE}/w500${movie.poster_path}`} alt={movie.title} />}
              {!movie.poster_path && <MovieIconPh />}
              <MovieName>
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              </MovieName>
            </MovieIndexDetail>
            <td>{movie.release_date}</td>
            <td>{movie.popularity || 0}</td>
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
          <MovieSearchBox search={search} setSearch={setSearchAction} resetSearch={searchReset} />
          {renderData()}
          {error && <div>{error}</div>}
        </TableWrapper>
        <MovieIndexPager page={page} pagesTotal={resultsPages} setPage={setPageAction} />
      </Container>
    </Page>
  )
}
