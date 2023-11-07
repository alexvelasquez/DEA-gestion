import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

// Guard para agregar token en los request
http.interceptors.request.use(
  (config) => {
    let accessToken = localStorage.getItem("token") || null;
    if (accessToken) {
      config.headers = Object.assign(
        {
          Authorization: `Bearer ${accessToken}`,
        },
        config.headers
      );
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Guard para controlar vencimiento de token
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const {
      response: { status, statusText },
    } = error;
    if (status === 401 && statusText === "Unauthorized") {
      localStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default http;
