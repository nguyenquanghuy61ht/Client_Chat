import axiosClient from "./axiosClient";

const messengerApi = {
  user() {
    const url = "/messenger/user";
    return axiosClient.get(url);
  },
  getUser(id) {
    const url = `/messenger/getuser/${id}`;
    return axiosClient.get(url);
  },
  getAllMessage(query) {
    const url = "/messenger/messages";
    return axiosClient.post(url, query);
  },

  postMessage(data) {
    const url = "/messenger/message";
    return axiosClient.post(url, data);
  },
  removeMessage(params) {
    const url = `/messenger/message/remove/${params}`;
    return axiosClient.patch(url);
  },
};
export default messengerApi;
