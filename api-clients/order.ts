import axiosClient from "./axios-client";

export const OrderApiManagement = {

  getAllOrderHistory(userId: string) {
    return axiosClient.get(`api/bill/historyAdmin/all?user_id=${userId}`);
  },

  getOrderHistoryPending(userId: string) {
    return axiosClient.get(`api/bill/historyAdmin/pending?user_id=${userId}`);
  },

  deleteOrderHistoryPending(billDetail: number) {
    return axiosClient.delete(`api/bill/pending/delete?bill_id=${billDetail}`);
  },

  getOrderHistoryDelivering(userId: string) {
    return axiosClient.get(`api/bill/historyAdmin/delivering?user_id=${userId}`);
  },

  getOrderHistorySuccess(userId: string) {
    return axiosClient.get(`api/bill/historyAdmin/success?user_id=${userId}`);
  },

  getOrderHistoryCancel(userId: string) {
    return axiosClient.get(`api/bill/historyAdmin/cancel?user_id=${userId}`);
  },

  getOrderHistoryReturn(userId: string) {
    return axiosClient.get(`api/bill/historyAdmin/return?user_id=${userId}`);
  },

  getBillDetail(bill_id: number) {
    return axiosClient.get(`api/bill/getbilldetails?bill_id=${bill_id}`);
  },

};