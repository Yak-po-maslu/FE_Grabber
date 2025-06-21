import React from 'react'
import FAQItem from '../FAQItem/FAQItem'

const FAQItems = [
  {
    question: 'Як продавати свої товари або послуги на Grabber?',
    answer:
      'Щоб продавати на Grabber, зареєструйтесь як продавець, додайте опис товарів або послуг, встановіть ціну та очікуйте замовлення від покупців у вашому регіоні.',
  },
  {
    question: 'Як здійснюється оплата та чи вона безпечна?',
    answer:
      'Оплата здійснюється через захищену платіжну систему Grabber. Ми гарантуємо безпеку транзакцій, використовуючи шифрування даних та інші заходи безпеки.',
  },
  {
    question: 'Як знайти товари або сервіси у своєму регіоні?',
    answer:
      'Використовуйте фільтри на сайті Grabber, щоб знайти товари або послуги у вашому регіоні. Ви можете вказати категорію, ціновий діапазон та інші параметри для точного пошуку.',
  },
  {
    question: 'Що робити, якщо товар не відповідає опису?',
    answer:
      'Якщо товар не відповідає опису, ви можете звернутися до продавця через Grabber для вирішення проблеми. Якщо це не допоможе, ви можете подати скаргу на платформі Grabber для розгляду ситуації.',
  },
]

interface FAQSectionProps {}

const FAQSection: React.FC<FAQSectionProps> = ({}) => {
  return (
    <section className="max-w-container mx-auto flex flex-col items-center justify-center py-[7.5rem]">
      <h2 className="self-center text-center text-h2">FAQ</h2>
      <div className="w-[70%]">
        {FAQItems.map((item, index) => (
          <FAQItem {...item} />
        ))}
      </div>
    </section>
  )
}

export default FAQSection
