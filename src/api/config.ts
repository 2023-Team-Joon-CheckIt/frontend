import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1';

export const baseInstance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL, // 기본 URL 설정
<<<<<<< HEAD
})
const token = localStorage.getItem('accessToken')
if (token) {
    baseInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const updateToken = (token: string) => {
  baseInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
=======
});
>>>>>>> develop

const token = localStorage.getItem('accessToken');
if (token) {
    baseInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Accept 헤더를 기본 헤더에 추가
baseInstance.defaults.headers.common['Accept'] = '*/*';

export const updateToken = (token: string) => {
  baseInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
