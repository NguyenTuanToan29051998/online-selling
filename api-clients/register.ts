import axiosClient from "./axios-client";

export const registerManagementAPI = {

  registerAcount(data: any) {
    return  axiosClient.post(`register/client`, data);
  }
};