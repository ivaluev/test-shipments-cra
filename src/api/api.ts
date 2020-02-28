import { Shipment, DataPage } from './types'

export const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3000/shipments'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function callApi(method: string, path?: string, data?: any) {
  const url = path ? `${API_ENDPOINT}/${path}` : API_ENDPOINT

  const res = await fetch(url, {
    method,
    headers: {
      Accept: 'application/json'
    },
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function getShipments(page: number): Promise<DataPage> {
  const shipments: Shipment[] = await callApi('get')
  const result = new DataPage(shipments, page)
  return result
}

export async function getShipmentById(id: string): Promise<Shipment> {
  const shipment: Shipment = await callApi('get', id)
  return shipment
}

export async function getShipmentsById(id: string, page: number): Promise<DataPage> {
  const shipments: Shipment[] = await callApi('get', id)
  const items = shipments.filter(sh => sh.id.includes(id))
  const result = new DataPage(items, page)
  return result
}
