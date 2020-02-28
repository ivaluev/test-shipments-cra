import React from 'react'
import styled from '../../utils/styled'

type ShipmentIndexPagerProps = {
  page: number
  pagesTotal: number
  setPage: (page: number) => void
}

export default function ShipmentIndexPager({ page, pagesTotal, setPage }: ShipmentIndexPagerProps) {
  const hasNext = page < pagesTotal

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
