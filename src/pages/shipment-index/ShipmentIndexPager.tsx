import React from 'react'
import styled from '../../utils/styled'

type ShipmentIndexPagerProps = {
  pagesTotal: number
  setUrl: () => void
  query: URLSearchParams
}

export default function ShipmentIndexPager({ pagesTotal, setUrl, query }: ShipmentIndexPagerProps) {
  const _page = 'page'

  const page = parseInt(query.get(_page) || '1', 10)
  const hasNext = page < pagesTotal

  const setPage = (newPage: number) => {
    query.set(_page, newPage.toString())
    setUrl()
  }

  const handlePageNext = () => {
    setPage(page + 1)
  }
  const handlePagePrev = () => {
    setPage(page - 1)
  }

  if (pagesTotal > 1) {
    return (
      <PaginationWrapper>
        {page > 1 && <PageNumber onClick={handlePagePrev}>← Previous</PageNumber>}
        <PageInfo>
          {page} / {pagesTotal}
        </PageInfo>
        {hasNext && <PageNumber onClick={handlePageNext}>Next →</PageNumber>}
      </PaginationWrapper>
    )
  }
  return null
}

const PaginationWrapper = styled.div`
  padding-top: 2em;
  text-align: center;
`
const PageInfo = styled.span`
  display: inline-block;
  margin: 0 2em;
`

const PageNumber = styled.a`
  display: inline-block;
  cursor: pointer;
`
