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
}

export class DataPage {
  constructor(shipments: Shipment[], page: number, pageSize = 20) {
    this.items = shipments.slice(pageSize * (page - 1), pageSize)
    this.pagesTotal = shipments.length
    this.page = page
  }

  items: Shipment[] | undefined

  pagesTotal: number | undefined

  page: number | undefined
}
