import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api.ezfrontend.com",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { config, status, data } = error.response;
    const urls = ["/auth/local/register", "/auth/local"];
    if (urls.includes(config.url) && status === 400) {
      const errorList = data.data || [];
      const firstError = errorList.length > 0 ? errorList[0] : {};
      const MeassageList = firstError.messages || [];
      const MeassageError = MeassageList.length > 0 ? MeassageList[0] : {};

      throw new Error(MeassageError.message);
    }
    // console.log(error);
    return Promise.reject(error);
  }
);
export default axiosClient;
