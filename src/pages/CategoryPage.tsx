import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { PATHS } from '../paths'
import OrnamentImgFill from '../assets/images/ornament_category_page_filled.svg?react'
import OrnamentImgTransparent from '../assets/images/ornament_category_page_transparent.svg?react'
import { CategoriesSection, RecommendedSection, SliderSection } from '../components'
import useFetchCategories from '../api/useFetchCategories'

interface CategoryPageProps {}

const CategoryPage: React.FC<CategoryPageProps> = ({}) => {
  const rawCategory = useParams().category

  const categoryPage = decodeURIComponent(rawCategory ?? '')

  const { data: categories } = useFetchCategories()

  return (
    <div className="mx-auto flex max-w-container flex-col justify-center gap-16 pb-24 pt-8 align-middle">
      <nav className="flex items-center gap-1 text-b4 text-gray-500">
        <p>
          <Link to={PATHS.HOME}>Головна</Link>
        </p>
        <p> / </p>
        <p className="text-gray-800">{categoryPage}</p>
      </nav>

      <section className="grid grid-cols-3 items-center gap-6 overflow-hidden">
        <div className="flex items-center justify-between gap-8 border-b border-grey-950 pb-2">
          <OrnamentImgTransparent className="h-full" />
          <OrnamentImgFill className="h-full" />
          <OrnamentImgTransparent className="h-full" />
        </div>
        <h1 className="text-center text-h2 font-bold">{categoryPage}</h1>
        <div className="flex items-center gap-8 border-b border-grey-950 pb-2">
          <OrnamentImgTransparent className="h-full" />
          <OrnamentImgFill className="h-full" />
          <OrnamentImgTransparent className="h-full" />
        </div>
      </section>

      <section>
        <h2 className="text-h31">Обирайте за підкатегорією</h2>
        <section className="mt-8">
          {categoryPage && categories && (
            <CategoriesSection
              categoryId={categories.find((cat) => cat.name === categoryPage)?.id}
              categoryName={categoryPage}
            />
          )}
        </section>
      </section>

      <RecommendedSection slideView={2} text="Вам може сподобатися" variant="home" />

      <SliderSection />
    </div>
  )
}

export default CategoryPage
