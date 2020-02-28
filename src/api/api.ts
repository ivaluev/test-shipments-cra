import { ShipmentPage } from './types'

export const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3000'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function callApi(method: string, url: string, data?: any) {
  const res = await fetch(url, {
    method,
    headers: {
      Accept: 'application/json'
    },
    body: JSON.stringify(data)
  })
  return res.json()
}

// export async function getShipmentsPage(page: number): Promise<ShipmentPage> {

// }

// export async function searchShipmentsById(id: number): ShipmentPage {
//   throw new Error('Функционал находится в разработке.')
// }
