import { Shipment, DataPage } from './types'

export const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3000'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function callApi(method: string, path?: string, data?: any) {
  const url = path ? `${API_ENDPOINT}${path}` : API_ENDPOINT

  let options: RequestInit

  if (data) {
    options = {
      method,
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  } else {
    options = {
      method,
      headers: {
        Accept: 'application/json'
      }
    }
  }

  const res = await fetch(url, options)
  return res.json()
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export async function getShipmentById(id: string): Promise<Shipment> {
  await delay(800)
  const shipment: Shipment = await callApi('get', `/shipments/${id}`)
  return shipment
}

export async function getShipments(query: URLSearchParams): Promise<DataPage> {
  await delay(800)
  const search = query.get('search')
  const shipments: Shipment[] = await callApi('get', search ? `/shipments?q=${search.trim()}` : '/shipments')
  const result = new DataPage(shipments, query)
  return result
}

export async function updateShipmentName(shId: string, name: string): Promise<Shipment> {
  await delay(800)
  const result: Shipment = await callApi('PATCH', `/shipments/${shId}`, { name })
  return result
}
