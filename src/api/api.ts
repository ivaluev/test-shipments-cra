import { Shipment, DataPage } from './types'

export const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3000/shipments'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function callApi(method: string, path?: string, data?: any) {
  const url = path ? `${API_ENDPOINT}/${path}` : API_ENDPOINT

  const res = await fetch(url, {
    method,
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return res.json()
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export async function getShipmentById(id: string): Promise<Shipment> {
  await delay(800)
  const shipment: Shipment = await callApi('get', id)
  return shipment
}

export async function getShipments(query: URLSearchParams): Promise<DataPage> {
  await delay(800)
  let shipments: Shipment[] = await callApi('get')

  const search = query.get('search')
  if (search && search.length) {
    shipments = shipments.filter(sh => sh.id.includes(search))
  }

  const result = new DataPage(shipments, query)
  return result
}

export async function updateShipmentName(shId: string, name: string): Promise<Shipment> {
  await delay(800)
  const result: Shipment = await callApi('PATCH', shId, { name })
  return result
}
