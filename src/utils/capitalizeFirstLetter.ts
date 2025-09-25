// Функція для капіталізації першої літери рядка
export function capitalizeFirstLetter(str: string) {
  // Перетворюємо перший символ у верхній регістр та додаємо решту рядка
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Функція для капіталізації першої літери кожного слова у рядку
export function capitalizeEachWord(str: string) {
  // Розбиваємо рядок на масив слів
  const words = str.split(' ')

  // Капіталізуємо кожне слово за допомогою функції capitalizeFirstLetter
  const capitalized = words.map((word) => capitalizeFirstLetter(word))

  // Об'єднуємо слова назад у рядок через пробіл
  return capitalized.join(' ')
}
