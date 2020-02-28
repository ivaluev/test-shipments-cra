export interface ShipmentCargo {
  type: string
  description: string
  volume: string
}

export interface ShipmentService {
  type: string
}

export interface Shipment {
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

export interface ShipmentPage {
  page: number
  pagesTotal: number
  items: Shipment[]
}
