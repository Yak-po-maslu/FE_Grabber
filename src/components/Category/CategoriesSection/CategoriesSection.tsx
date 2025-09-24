import React from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '../../../paths.ts'
import CategoryCard from '../CategoryCard/CategoryCard.tsx'
import useFetchCategories from '../../../api/useFetchCategories.ts'
import CategoryLoader from '../CategoryLoader/CategoryLoader.tsx'

interface CategoriesSectionProps {}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({}) => {
  const { data: categories, error, status } = useFetchCategories()

  return (
    <>
      {/* Основний контейнер секції категорій */}
      <section className="mx-auto max-w-container pb-[64px]">
        {/* Заголовок секції */}
        <h1 className="my-16 text-wrap text-center font-kyiv text-h1">Категорії</h1>

        {/* Сітка для відображення категорій */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(285px,1fr))] gap-5">
          {/* Показати лоадер під час завантаження категорій */}
          {status === 'pending' && <CategoryLoader countItems={4} />}

          {/* Відобразити помилку, якщо не вдалося завантажити категорії */}
          {status === 'error' && (
            <div className="col-span-full text-center text-error-default">
              Помилка завантаження категорій: {error.message}
            </div>
          )}

          {/* Відобразити повідомлення, якщо категорій немає */}
          {status === 'success' && categories && categories.length === 0 && (
            <div className="col-span-full text-center text-grey-500">
              Наразі немає доступних категорій
            </div>
          )}

          {/* Відобразити список категорій, якщо вони є */}
          {status === 'success' &&
            categories &&
            categories.length > 0 &&
            categories.map((category) => (
              // Кожна категорія є посиланням на сторінку категорії
              <Link
                to={`${PATHS.PRODUCTS.category}${category.name}`}
                className="no-underline"
                key={category.id}
              >
                {/* Карточка категорії */}
                <CategoryCard {...category} />
              </Link>
            ))}
        </div>
      </section>
    </>
  )
}

export default CategoriesSection
