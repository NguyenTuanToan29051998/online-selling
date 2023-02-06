import axiosClient from "./axios-client";

export const FavoriteApiManagement = {

  addProductToFavorite(userId: string, proId: number) {
    return axiosClient.post(`api/product/addlike?product_id=${proId}&user=${userId}`);
  },

  getFavoritesList(userId: string) {
    return axiosClient.get(`api/product/userLike?user=${userId}`);
  }

};
