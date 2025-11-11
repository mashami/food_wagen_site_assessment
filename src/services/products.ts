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
