import { useState } from 'react'

export function useApiRequest<T>() {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const execute = (apiMethod: () => Promise<T>) => {
    setLoading(true)
    setError(null)
    setIsSuccess(false)

    return apiMethod()
      .then((response) => {
        setData(response)
        setIsSuccess(true)

        return response
      })
      .catch((error) => {
        const message = error?.response?.data?.error || 'Щось пішло не так. Спробуйте ще раз.'
        setError(message)
        setData(null)
        setIsSuccess(false)
        throw error
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return { data, error, loading, isSuccess, execute }
}
