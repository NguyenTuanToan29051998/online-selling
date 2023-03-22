import axiosClient from "./axios-client";

export const homeApiManagement = {

  getAllProductHome(userId: string) {
    return axiosClient.get(`/api/home/index?user=${userId}`);
  },

  getAllProduct(userId: string) {
    return axiosClient.get(`/api/product/all?user=${userId}`);
  },
};
