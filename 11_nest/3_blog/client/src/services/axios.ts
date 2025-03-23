import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// yapılcak bütün isteklere access token varsa ekle

// eğer refresh tokenın süresi dolduysa yeni bir access token al
// gelen cevaptaki hatayı kontrol edip refresh endpointine istek at
// eğer refresh token'ında süresi dolduysa login sayfasına yönlendir

export default api;
