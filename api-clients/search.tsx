import axiosClient from "./axios-client";

export const searchManagementAPI = {

  // getAll(searchInput: string, typeUser: number, pageNumber: number, pageSize: number) {
  //   return axiosClient.get(`Search?searchInput=${searchInput}&PostType=${typeUser}&PageNumber=${pageNumber}&PageSize=${pageSize}`);
  // },

  getDataSearch(searchInput: string) {
    return axiosClient.get(`api/home/search?keyword=${searchInput}`);
  },

  getDataFilter(cateName: string, rating: string, color: string, size: string, min: number, max: number) {
    return  axiosClient.post(`api/product/filters?cateName=${cateName || ''}&material=&color=${color || ''}&size=${size || ''}&min=${min || ''}&max=${max || ''}&order=asc&rating=${rating || ''}&page=0&sizepage=24&user=1`);
  }
};
