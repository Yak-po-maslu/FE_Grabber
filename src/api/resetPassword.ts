import { axiosClient } from './axiosClient'
import { API_ENDPOINTS } from '../paths'

export async function resetPassword(credentials: { password: string; uid: string; token: string }) {
  const { password, uid, token } = credentials

  const response = await axiosClient.post(
    API_ENDPOINTS.PASSWORD.reset,
    {
      uid,
      token,
      new_password: password,
    },
    {
      withCredentials: true,
    },
  )

  return response.data
}
