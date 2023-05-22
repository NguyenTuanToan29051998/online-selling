import axiosClient from "./axios-client";

export const CheckoutApiManagement = {

  checkoutProduct(userId: string, price: number, address: string, ward: string, district: string, province: string, decrease: number, discountId: number|null, paymentType: string ) {
    return axiosClient.post(`/api/payMoney?user=${userId}&price=${price}&address=${address}&ward=${ward}&district=${district}&province=${province}&services=1234&note=note&decrease=${decrease}&discountId=${discountId}&paymentType=${paymentType}`);
  },

};

