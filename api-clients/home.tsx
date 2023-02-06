import axiosClient from "./axios-client";

export const homeApiManagement = {

  getAllProduct(userId: string) {
    return axiosClient.get(`/api/home/index?user=${userId}`);
  },
};
