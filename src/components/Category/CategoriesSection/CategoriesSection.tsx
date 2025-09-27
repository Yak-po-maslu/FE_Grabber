import React from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '../../../paths.ts'
import CategoryCard from '../CategoryCard/CategoryCard.tsx'
import CategoryLoader from '../CategoryLoader/CategoryLoader.tsx'
import useFetchSubcategories from '../../../api/useFetchSubcategories.ts'
import { TCategory } from '../../../types/categoryTypes.ts'

interface CategoriesSectionProps {
  categoryId: number | undefined
  categoryName: string
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ categoryId, categoryName }) => {
  const [filterSubcategories, setFilterSubcategories] = React.useState<TCategory[] | null>(null)

  const { data: subcategories, error, status } = useFetchSubcategories()

  React.useEffect(() => {
    if (subcategories && categoryId) {
      const foundSubcategories = subcategories.filter((cat) => cat.category === categoryId)

      if (foundSubcategories.length > 0) {
        setFilterSubcategories(foundSubcategories)
      } else {
        setFilterSubcategories(null)
      }
    }
  }, [subcategories, categoryId])

  return (
    <>
      {/* Основний контейнер секції категорій */}
      <section className="mx-auto max-w-container pb-[64px]">
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
          {status === 'success' && filterSubcategories && filterSubcategories.length === 0 && (
            <div className="col-span-full text-center text-grey-500">
              Наразі немає доступних категорій
            </div>
          )}

          {/* Відобразити список категорій, якщо вони є */}
          {status === 'success' &&
            filterSubcategories &&
            filterSubcategories.map((subCategory) => (
              // Кожна категорія є посиланням на сторінку категорії
              <Link
                to={`${PATHS.PRODUCTS.subcategory.replace(':category', categoryName).replace(':subcategory', subCategory.name)}`}
                className="no-underline"
                key={subCategory.id}
              >
                {/* Карточка категорії */}
                <CategoryCard {...subCategory} />
              </Link>
            ))}
        </div>
      </section>
    </>
  )
}

export default CategoriesSection
