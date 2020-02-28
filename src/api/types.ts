export interface ShipmentCargo {
  type: string
  description: string
  volume: string
}

export interface Shipment {
  id: string
  name: string
  cargo: ShipmentCargo[]
  
}

export interface ShipmentPage {
  page: number
  pagesTotal: number
  items: Shipment[]
}
