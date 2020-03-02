export const SORT_BY = 'sort'
export const SORT_ORDER = 'order'
export const SORT_ORDER_DESC = 'desc'
export const SORT_ORDER_ASC = 'asc'
export const _PAGE = 'page'

export type ShipmentCargo = {
  type: string
  description: string
  volume: string
}

export type ShipmentService = {
  type: string
}

export type Shipment = {
  id: string
  name: string
  cargo: ShipmentCargo[]
  mode: string
  type: string
  destination: string
  origin: string
  services: ShipmentService[]
  total: string
  status: string
  userId: string
  [name: string]: string | ShipmentCargo[] | ShipmentService[]
}

export class DataPage {
  constructor(shipments: Shipment[], query: URLSearchParams, pageSize = 20) {
    let sortedShipments = shipments

    if (query.has(SORT_BY)) {
      const sortBy = query.get(SORT_BY) || ''
      const sortByKey = sortBy.toLowerCase()
      sortedShipments = sortedShipments.sort((a, b) => {
        if (a[sortByKey] > b[sortByKey]) {
          return 1
          // eslint-disable-next-line no-else-return
        } else if (a[sortByKey] < b[sortByKey]) {
          return -1
        }
        return 0
      })
      if (query.get(SORT_ORDER) === SORT_ORDER_DESC) {
        sortedShipments.reverse()
      }
    }

    const page = parseInt(query.get(_PAGE) || '1', 10)

    const indexStart = pageSize * (page - 1)
    const indexEnd = Math.min(indexStart + pageSize, sortedShipments.length)

    this.items = sortedShipments.slice(indexStart, indexEnd) || []
    this.pagesTotal = Math.ceil((sortedShipments.length || 0) / pageSize)
    this.page = page || 1
  }

  items: Shipment[]

  pagesTotal: number

  page: number
}
