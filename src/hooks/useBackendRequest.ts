import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_ENDPOINTS } from '../paths'
import { ApiError } from '../types/types'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export type TQueryParams = Record<string, string | number | boolean>

type Params<Data> = {
  path: string
  method?: HttpMethod
  data?: Data
  contentType?: string
  queryParams?: TQueryParams
}

const backendURL = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: backendURL,
  withCredentials: true,
})

const useBackendRequest = () => {
  const request = async <Response, Data = void>({
    path,
    method = 'GET',
    data,
    contentType = 'application/json',
    queryParams,
  }: Params<Data>): Promise<Response> => {
    const config: AxiosRequestConfig<Data> = {
      url: path,
      method,
      data,
      headers: {
        'Content-Type': contentType,
      },
      params: queryParams,
    }

    try {
      const response: AxiosResponse<Response> = await api.request(config)

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.code == 'authentication_failed') {
          api.request({ url: API_ENDPOINTS.AUTH.refreshToken, method: 'POST' })
        }

        const apiError: ApiError = new Error(error.message)
        apiError.message = error.response?.data
        apiError.status = error.response?.status
        apiError.isAxiosError = true
        throw apiError
      }

      throw error
    }
  }

  return request
}

export default useBackendRequest
