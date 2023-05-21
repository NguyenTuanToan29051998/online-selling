import { type } from "os";

export type OrderType = {
  id: number,
  total: number,
  paymentType: string,
  note: string,
  status: string,
  customer: number,
  staff: number,
  billDetails: billDetailType[],
}

export type billDetailType = {
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

export type ColorBillDetail = {
  billDetailId: number;
  colorOrderDTOs: {
    color: string,
    image: string,
    sizeQuantityDTOs: [
      {
        size: string,
        quantity: number
      }
    ]
  }[]
}