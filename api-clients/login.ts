import axiosClient from "./axios-client";

export const LoginApiManagement = {

  getLoginInfo(username: string, password: string) {
    return axiosClient.post(`/rest/security/login?username=${username}&password=${password}`);
  },
};
