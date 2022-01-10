import axios from 'axios'

import { getSessionToken } from './cookies.helpers'

const BASE_URL = 'http://localhost:8080'

const axiosApi = axios.create({
  baseURL: BASE_URL,
})

axiosApi.interceptors.request.use(
  (request) => {
    const token = getSessionToken()
    if (token) {
      request.headers = {
        ...request.headers,
        Authorization: `Bearer ${token}`
      }
    }
    return request
  },
  (error) => {
    throw error
  }
)

export async function get(url: string, config = {}) {
  return await axiosApi.get(url, { ...config }).then((response) => response.data)
}

export async function post(url: string, data: any, config = {}) {
  return axiosApi.post(url, { ...data }, { ...config }).then((response) => response.data)
}

export async function put(url: string, data: any, config = {}) {
  return axiosApi.put(url, { ...data }, { ...config }).then((response) => response.data)
}

export async function del(url: string, config = {}) {
  return await axiosApi.delete(url, { ...config }).then((response) => response.data)
}
