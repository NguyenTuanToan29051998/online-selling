import axiosClient from "./axios-client";

export const FeeApiManagement = {

  getCartDetail(userId: string) {
    return axiosClient.get(`/api/cart/list?user=${userId}`);
  },

};