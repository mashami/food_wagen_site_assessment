import { HttpStatusCode } from '@/utils/enums'
import { ProductTypes } from '@/utils/types'
import { NextResponse } from 'next/server'

const API_URL = 'https://6852821e0594059b23cdd834.mockapi.io/Food'

export async function POST(req: Request) {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: true, message: 'Failed to fetch data' },
        { status: HttpStatusCode.BAD_REQUEST },
      )
    }

    const data: ProductTypes[] = await response.json()

    // console.log(data)

    return NextResponse.json(
      { error: false, message: 'Success', data },
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

// import { NextResponse } from 'next/server'

// export async function POST() {
//   try {
//     const res = await fetch('https://6852821e0594059b23cdd834.mockapi.io/Food')
//     const data = await res.json()

//     return NextResponse.json({
//       error: false,
//       message: 'Success',
//       data,
//     })
//   } catch (error) {
//     return NextResponse.json(
//       { error: true, message: 'Failed to fetch data' },
//       { status: 500 },
//     )
//   }
// }
