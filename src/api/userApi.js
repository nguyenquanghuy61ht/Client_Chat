import axiosClient from "./axiosClient";

const userApi = {
  //get tat ca bao nhieu trang ,search....

  signup(data) {
    const url = "/auth/signup";
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = "/auth/login";
    return axiosClient.post(url, data);
  },
  status(data) {
    const url = "/auth/status";
    return axiosClient.put(url, data);
  },
  UpdateAvatar(data) {
    const url = `/auth/avatar/${data.userId}`;
    return axiosClient.put(url, { file: data.file });
  },
};
export default userApi;
