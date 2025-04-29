import { useState } from 'react'

export function useApiRequest<T>() {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const execute = async (apiMethod: () => Promise<T>) => {
    setLoading(true)
    setError(null)
    setIsSuccess(false)

    try {
      const response = await apiMethod()
      setData(response)
      setIsSuccess(true)
    } catch (error: any) {
      const message = error?.response?.data?.error || 'Щось пішло не так. Спробуйте ще раз.'
      setError(message)
      setData(null)
      setIsSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  return { data, error, loading, isSuccess, execute }
}
