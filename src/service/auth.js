import axios from "axios"
axios.defaults.headers.get['Accepts'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Method'] = ['GET, POST, PUT, DELETE'];
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
axios.defaults.baseURL = 'http://localhost:8080/api/'
// if(sessionStorage.getItem("jwtToken") != null && sessionStorage.getItem("jwtToken") != ""){
//     axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem("jwtToken");
// }

const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    const jwtToken = sessionStorage.getItem('jwtToken');
    if (jwtToken) {
      config.headers['Authorization'] = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = sessionStorage.getItem('refresh_token');
      return axios.post('http://localhost:8080/api/refresh', { refreshToken })
        .then((response) => {
          if (response.status === 200) {
            sessionStorage.setItem('jwtToken', response.data.access_token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
            return axios(originalRequest);
          }
        })
        .catch((error) => {
          console.error('Lỗi lấy refresh token:', error);
        });
    }
    return Promise.reject(error);
  }
);

export default instance;