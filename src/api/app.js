import axios, { AxiosResponse } from 'axios'
import qs from 'qs'
const service = axios.create({ //hg
    baseURL: process.env.NODE_ENV === 'development'?'/api':test+'/index.php',
    withCredentials: false,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})
service.interceptors.response.use(
    response => {
      return response
    },
    (error) => {
			alert('网络错误，请稍后重试')
			return Promise.reject(error)
    }
)