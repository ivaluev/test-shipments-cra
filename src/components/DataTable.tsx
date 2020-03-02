import React from 'react'
import styled from '../services/styled'

interface DataTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: React.ReactNode[]
  widths?: string[]
}

const DataTable: React.FC<DataTableProps> = ({ children, columns, widths }) => (
  <Wrapper>
    <thead>
      <tr>
        {columns.map((column, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <th key={i} style={widths && widths[i] ? { width: widths[i] } : undefined}>
            {column}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </Wrapper>
)

export default DataTable

const Wrapper = styled('table')`
  margin-bottom: 0;
  border-top: 1px solid ${props => props.theme.colors.borders};
  border-bottom: 1px solid ${props => props.theme.colors.borders};

  thead {
    tr {
      th {
        padding: 0 1rem;
        text-align: left;
        border-bottom: 2px solid ${props => props.theme.colors.borders};
      }
    }
  }

  tbody {
    tr {
      border-top: 1px solid ${props => props.theme.colors.borders};
      height: 45px;

      &:nth-of-type() {
        background: ${props => props.theme.colors.tableOdd};
      }

      td {
        padding: 0.5rem 1rem;
        font-size: 0.85rem;
      }
    }
  }
`
