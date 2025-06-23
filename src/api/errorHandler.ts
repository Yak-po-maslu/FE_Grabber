import { AxiosError } from 'axios'
// import { toast } from 'your-toast-lib' // якщо використовуєш toasts

export function handleAxiosError(error: AxiosError) {
  if (error.response) {
    const status = error.response.status
    const message = (error.response.data as { message?: string })?.message || 'Unknown server error'

    console.error(`[${status}] Server error:`, message)

    // toast.error(`Error ${status}: ${message}`) // або покажи повідомлення

    //Todo: ❓ Тут можна зробити ще додаткову логіку по статусу
    if (status === 401) {
      // redirectToLogin() або показати модалку "Сесія закінчилась"
    } else if (status === 500) {
      // toast.error("Внутрішня помилка сервера")
    }
  } else if (error.request) {
    console.error('⚠️ No response from server:', error.request)
    // toast.error("Сервер не відповідає. Перевірте інтернет.")
  } else {
    console.error('❌ Request setup error:', error.message)
    // toast.error("Помилка налаштування запиту: " + error.message)
  }
}
