import { useState } from 'react'
import axios from 'axios'

// Створюємо екземпляр axios з базовим URL, який береться з середовища виконання
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Налаштовуємо перехоплювачі для обробки відповідей
axiosClient.interceptors.response.use(
  (response) => response, // Успішна відповідь повертається без змін
  (error) => {
    console.error('Error in response:', error) // Логування помилки
    return Promise.reject(error) // Відхиляємо обіцянку з помилкою
  },
)

// Хук для отримання даних з API
export function useFetchData<T>() {
  // Стан для збереження отриманих даних
  const [data, setData] = useState<T | null>(null)
  // Стан для збереження повідомлення про помилку
  const [error, setError] = useState<string | null>(null)
  // Стан для відстеження процесу завантаження
  const [loading, setLoading] = useState<boolean>(false)

  // Функція для отримання даних з API
  const fetchData = async (endpoint: string) => {
    setLoading(true) // Встановлюємо стан завантаження
    try {
      const response = await axiosClient.get<T>(endpoint) // Виконуємо GET-запит
      setData(response.data) // Зберігаємо отримані дані
      setError(null) // Скидаємо помилку
    } catch (error) {
      // Обробляємо помилку, якщо вона виникла
      setError(error instanceof Error ? error.message : 'Unknown error')
      setData(null) // Скидаємо дані
    } finally {
      setLoading(false) // Завершуємо стан завантаження
    }
  }

  // Повертаємо стан та функцію для отримання даних
  return { data, error, loading, fetchData }
}
