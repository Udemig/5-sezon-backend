import axios from "axios";
import { authService } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// eğer refresh tokenın süresi dolduysa yeni bir access token al
// gelen cevaptaki hatayı kontrol edip refresh endpointine istek at
// eğer refresh token'ında süresi dolduysa login sayfasına yönlendir
api.interceptors.response.use(
  // api'dan gelen her olumlu cevap'ta çalışır
  (res) => res,

  // api'dan gelen her hata için çalışır
  async (error) => {
    // atılan api isteğini al
    const originalRequest = error.config;

    // eğer hatanın sebebi access tokenın süresinin dolması ise
    if (
      originalRequest &&
      !originalRequest.retry &&
      error.response?.status === 401 &&
      error.response?.data?.message === "Unauthorized" &&
      originalRequest.url !== "/auth/refresh" &&
      originalRequest.url !== "/auth/logout" &&
      originalRequest.url !== "/auth/login" &&
      originalRequest.url !== "/auth/register"
    ) {
      console.log(originalRequest.url);
      // isteği tekrar denemek için retry değişkenini true yap
      originalRequest.retry = true;

      try {
        // refresh token ile yeni bir access token
        await api.post("/auth/refresh");

        // yeni access token ile hata aldığımız isteği tekrar gönder
        return api.request(originalRequest);
      } catch (error) {
        // eğer refresh token'ın süresi dolduysa login sayfasına yönlendir
        await authService.logout();
        window.location.href = "/login";

        // hata döndür
        return Promise.reject(error);
      }
    }

    // hata döndür
    return Promise.reject(error);
  }
);

export default api;
