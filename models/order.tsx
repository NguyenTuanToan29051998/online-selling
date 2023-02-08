export type OrderType = {
  id: number,
  total: number,
  paymentType: string,
  note: string,
  status: string,
  customer: number,
  staff: number,
  billDetails: [
    {
      id: number,
      quantity: number,
      unitPrice: number,
      total: number,
      productDetail: {
        id: number,
        size: string,
        color: string,
        quantity: number,
        thumnail: string,
        product: {
          productname: string;
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
    }
  ],
}