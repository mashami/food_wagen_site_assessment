import { HttpStatusCode } from '@/utils/enums'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { searchParam } = await req.json()

    if (!searchParam || searchParam.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'Search parameter is required' },
        { status: HttpStatusCode.NOT_FOUND },
      )
    }

    const response = await fetch(
      `https://6852821e0594059b23cdd834.mockapi.io/Food?name=${encodeURIComponent(
        searchParam,
      )}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    )

    if (!response.ok) {
      return NextResponse.json(
        { error: true, message: 'Failed to fetch data from MockAPI' },
        { status: HttpStatusCode.BAD_REQUEST },
      )
    }

    const data = await response.json()

    return NextResponse.json(
      { success: true, data },
      { status: HttpStatusCode.OK },
    )
  } catch (error) {
    console.error('Search API Error:', error)
    return NextResponse.json(
      { error: true, message: 'An error occurred. Please try again.' },
      { status: HttpStatusCode.INTERNAL_SERVER },
    )
  }
}
