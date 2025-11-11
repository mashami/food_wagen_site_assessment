import { HttpStatusCode } from '@/utils/enums'
import { NextResponse } from 'next/server'

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 },
      )
    }

    const response = await fetch(
      `https://6852821e0594059b23cdd834.mockapi.io/Food/${id}`,
      {
        method: 'DELETE',
      },
    )

    if (!response.ok) {
      return NextResponse.json(
        { error: true, message: 'Failed to delete product' },
        { status: HttpStatusCode.BAD_REQUEST },
      )
    }
    // const result = await response.json()
    return NextResponse.json(
      { error: false, message: 'Successfully delete product' },
      { status: HttpStatusCode.OK },
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: HttpStatusCode.INTERNAL_SERVER },
    )
  }
}
