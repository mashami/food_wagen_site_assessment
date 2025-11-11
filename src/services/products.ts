import { ProductTypes } from '@/utils/types'

export const getAllProducts = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ''
    const response = await fetch(`${baseUrl}/api/getAllProducts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error fetching products:', error)
    return null
  }
}

export const AddProducts = async ({
  name,
  avatar,
  logo,
  createdAt,
  open,
  rating,
  restaurantName,
}: ProductTypes) => {
  try {
    const response = await fetch('/api/addProduct', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        avatar,
        logo,
        createdAt,
        open,
        rating,
        restaurantName,
      }),
    })

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error fetching products:', error)
    return null
  }
}

export const deleteProduct = async (id: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ''
  const response = await fetch(`${baseUrl}/api/deleteProduct`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  })

  if (!response.ok) {
    throw new Error('Failed to delete product')
  }

  return await response.json()
}
