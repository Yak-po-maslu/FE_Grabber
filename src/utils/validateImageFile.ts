// Функція для валідації зображення (приклад)
export const validateImage = (file: File): string | null => {
  const allowedTypes = ['image/jpeg', 'image/png']
  const maxSize = 5 * 1024 * 1024 // 5MB

  if (!allowedTypes.includes(file.type)) {
    return 'Дозволені лише JPG, PNG'
  }

  if (file.size > maxSize) {
    return 'Максимальний розмір зображення 5MB'
  }

  return null
}
