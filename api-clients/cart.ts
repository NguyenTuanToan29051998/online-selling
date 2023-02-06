import axiosClient from "./axios-client";

export const CartApiManagement = {

  getCartDetail(userId: string) {
    return axiosClient.get(`/api/cart/list?user=${userId}`);
  },

  addProductToCart(userId: string, color: string, size: string, proId: number, quantity: number) {
    return axiosClient.post(`/api/cart/add?color=${color}&proId=${proId}&size=${size}&quantity=${quantity}&user=${userId}`);
  },

  updateProductInCart(cartId: number, quantity: number) {
    return axiosClient.put(`/api/cart/update?cartId=${cartId}&quantity=${quantity}`);
  },

  deleteProductInCart(userId: string, cartId: number) {
    return axiosClient.get(`api/cart/delete?cartId=${cartId}&user=${userId}`);
  }

};
