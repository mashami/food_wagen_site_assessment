export interface ProductTypes {
  id: string
  name: string
  image: string
  open: boolean | string
  rating: number
  avatar: string
  logo: string
  Price: string
  restaurantName: string
  createdAt: string
  status: string
}

export interface ProductUpdateTypes {
  id: string
  name: string
  open: boolean | string
  rating: number
  avatar: string
  logo: string
  restaurantName: string
  createdAt: string
}
