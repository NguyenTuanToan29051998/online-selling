export type CartType = {
  cartDetail: {
    cartItems: {
      id: number,
      quantity: number,
      newPrice: number,
      total: number,
      isSelected: boolean,
      product: {
        id: number,
        size: string,
        color: string,
        quantity: number,
        thumnail: string,
        product: {
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
          },
        },
      },
    }[],
    totalCost: number,
  },

  discounts: Discounts[],
}

export type Discounts = {
  discount: {
    id: number,
    condition: number,
    decreasePercent: number,
    discountName: string,
    quantity: number,
    memberType: null,
    unit: string
  },
  reason: null,
  able: boolean
}