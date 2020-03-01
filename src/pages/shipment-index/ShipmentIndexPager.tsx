import React from 'react'
import styled from '../../utils/styled'
import { BrandLink } from '../../components/BrandLink'

const _page = 'page'

type ShipmentIndexPagerProps = {
  pagesTotal: number
  setUrl: () => void
  query: URLSearchParams
}

export default function ShipmentIndexPager({ pagesTotal, query, setUrl }: ShipmentIndexPagerProps) {
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
        {page > 1 && <BrandLink onClick={handlePagePrev}>← Previous</BrandLink>}
        <PageInfo>
          {page} / {pagesTotal}
        </PageInfo>
        {hasNext && <BrandLink onClick={handlePageNext}>Next →</BrandLink>}
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
