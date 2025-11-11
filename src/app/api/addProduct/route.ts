import { HttpStatusCode } from '@/utils/enums'
import { ProductTypes } from '@/utils/types'
import { NextResponse } from 'next/server'

const API_URL = 'https://6852821e0594059b23cdd834.mockapi.io/Food'

export async function POST(req: Request) {
  const {
    avatar,
    createdAt,
    logo,
    name,
    open,
    rating,
  }: ProductTypes = await req.json()
  try {
    if (!name || !avatar || !createdAt || !logo || !open || !rating) {
      return NextResponse.json(
        { error: true, message: 'All fields required' },
        { status: HttpStatusCode.BAD_REQUEST },
      )
    }
    const result = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, avatar, createdAt, logo, open }),
      cache: 'no-store',
    })

    if (!result) {
      return NextResponse.json(
        { error: true, message: 'Failed to add product' },
        { status: HttpStatusCode.BAD_REQUEST },
      )
    }
    const data: ProductTypes[] = await result.json()

    return NextResponse.json(
      { error: false, message: 'Successfully add product', data },
      { status: HttpStatusCode.OK },
    )
  } catch (error) {
    console.error('Error fetching data:', error)
    return NextResponse.json(
      { error: true, message: 'An error occurred. Please try again.' },
      { status: HttpStatusCode.INTERNAL_SERVER },
    )
  }
}
