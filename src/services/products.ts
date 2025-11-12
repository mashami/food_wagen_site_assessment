import { HttpStatusCode } from '@/utils/enums'
import { ProductTypes, ProductUpdateTypes } from '@/utils/types'
import { NextResponse } from 'next/server'

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

export const searchProducts = async (searchParam: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ''

  const response = await fetch(`${baseUrl}/api/searchProduct`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ searchParam }),
  })

  if (!response.ok) {
    return NextResponse.json(
      { error: true, message: 'Failed to fetch data from MockAPI' },
      { status: HttpStatusCode.BAD_REQUEST },
    )
  }

  const result = await response.json()
  return result.data
}

// export const updateProduct = async ({
//   name,
//   avatar,
//   logo,
//   createdAt,
//   open,
//   rating,
//   restaurantName,
//   id,
// }: ProductUpdateTypes) => {
//   const result = await fetch(`/api/updateProduct/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       name,
//       avatar,
//       createdAt,
//       logo,
//       open,
//       rating,
//       restaurantName,
//     }),
//   })

//   const data = await result.json()

//   if (!result.ok) {
//     return NextResponse.json(
//       { error: true, message: 'Failed to fetch data from MockAPI' },
//       { status: HttpStatusCode.BAD_REQUEST },
//     )
//   }
//   return data
// }

// services/updateProduct.ts
export const updateProduct = async ({
  name,
  avatar,
  logo,
  createdAt,
  open,
  rating,
  restaurantName,
  id,
}: ProductUpdateTypes) => {
  try {
    const result = await fetch(`/api/updateProduct/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        avatar,
        createdAt,
        logo,
        open,
        rating,
        restaurantName,
      }),
    })

    const data = await result.json()

    if (!result.ok) {
      return {
        ok: false,
        error: true,
        message: data.message || 'Failed to update product',
      }
    }

    return {
      ok: true,
      message: 'Product updated successfully',
      data,
    }
  } catch (error) {
    console.error('updateProduct error:', error)
    return {
      ok: false,
      error: true,
      message: 'Something went wrong while updating product',
    }
  }
}

export const getProduct = async (id: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ''
  const response = await fetch(`${baseUrl}/api/getProductById/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  })

  if (!response.ok) {
    throw new Error('Failed to delete product')
  }

  return await response.json()
}
