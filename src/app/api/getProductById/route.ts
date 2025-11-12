import { HttpStatusCode } from '@/utils/enums'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: HttpStatusCode.NOT_FOUND },
      )
    }

    const response = await fetch(
      `https://6852821e0594059b23cdd834.mockapi.io/Food/${id}`,
      {
        method: 'GET',
      },
    )

    if (!response.ok) {
      return NextResponse.json(
        { error: true, message: 'Product not Found' },
        { status: HttpStatusCode.NOT_FOUND },
      )
    }
    const result = await response.json()
    return NextResponse.json(
      { error: false, message: 'Get Product Successfully', data: result },
      { status: HttpStatusCode.OK },
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: HttpStatusCode.INTERNAL_SERVER },
    )
  }
}
