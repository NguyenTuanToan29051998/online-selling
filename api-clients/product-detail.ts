import axiosClient from "./axios-client";

export const ProductDetailApiManagement = {

  getProduct(id: number) {
    return axiosClient.get(`/api/productDetail/index?id=${id}`);
  },

  getNumberProduct(id: string, color: string, size: string) {
    return axiosClient.get(`/api/productDetail/quantity?color=${color}&size=${size}&id=${id}`);
  },

  addProductToCart(userId: string, color: string, size: string, proId: number, quantity: number) {
    return axiosClient.post(`/api/cart/add?color=${color}&proId=${proId}&size=${size}&quantity=${quantity}&user=${userId}`);
  }
};
