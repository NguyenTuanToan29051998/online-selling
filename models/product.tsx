export type ProductDetailType = {
  product: ProductOverviewType,
  colors: {
    color: string,
    image: string,
    relatedSizes: {
      remained: boolean,
      size: string,
    }[],
  }[],
  sizes: {
    size: string,
    relatedColors: {
      remained: boolean,
      color: string,
      image: string,
    }[],
  }[],
}

export type ProductOverviewType = {
  boughtQuantity: number,
  decreasePercent: number,
  like: true,
  newPrice: number,
  rating: string,
  product: ProductType,
}

export type ProductType = {
  id: number,
  name: string,
  price: number,
  note: string,
  material: string,
  image: string,
  category: {
    id: number,
    name: string,
    note: string,
    status: number,
  }
}


