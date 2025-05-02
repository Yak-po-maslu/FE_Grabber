import { axiosClient } from './axiosClient'
import { API_ENDPOINTS } from '../paths'

export async function forgotPassword(credentials: { email: string }) {
  const response = await axiosClient.post(API_ENDPOINTS.PASSWORD.forgot, credentials, {
    withCredentials: true,
  })

  return response.data
}
