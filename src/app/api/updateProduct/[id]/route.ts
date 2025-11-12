import { NextRequest, NextResponse } from 'next/server'
import { HttpStatusCode } from '@/utils/enums'

export async function PUT(request: NextRequest, context: any) {
  try {
    const id = context.params?.id
    const body = await request.json()

    const API_URL = `https://6852821e0594059b23cdd834.mockapi.io/Food/${id}`

    const response = await fetch(API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: true,
          message: 'Failed to update item on MockAPI',
        },
        { status: HttpStatusCode.BAD_REQUEST },
      )
    }

    return NextResponse.json(
      {
        ok: true,
        message: 'Item updated successfully',
        data,
      },
      { status: HttpStatusCode.OK },
    )
  } catch (error) {
    console.error('API update error:', error)
    return NextResponse.json(
      {
        ok: false,
        error: true,
        message: 'Something went wrong on server',
      },
      { status: HttpStatusCode.INTERNAL_SERVER },
    )
  }
}
