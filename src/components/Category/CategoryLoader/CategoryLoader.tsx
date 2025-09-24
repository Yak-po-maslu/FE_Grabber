import React from 'react'
import IconPlaceholderImg from '../../../assets/images/placeholder-loader-category.svg?react'

interface CategoryLoaderProps {
  countItems: number
}

const CategoryLoader: React.FC<CategoryLoaderProps> = ({ countItems }) => {
  return Array.from({ length: countItems }).map((_, index) => (
    <article
      className="animate-pulse grid max-w-sm grid-cols-1 grid-rows-[auto_auto_1fr] overflow-hidden rounded-2xl border border-grey-200 p-4 p-6 shadow md:p-6 dark:border-grey-400"
      key={'categoryLoader_' + index}
    >
      <div className="mb-4 flex h-48 items-center justify-center rounded-lg bg-grey-300 dark:bg-grey-400">
        <IconPlaceholderImg className="h-10 w-10 text-grey-200 dark:text-grey-200" />
      </div>
      <div className="mb-4 h-2.5 w-48 rounded-full bg-grey-200 dark:bg-grey-400"></div>
      <div className="mb-2.5 h-2 rounded-full bg-grey-200 dark:bg-grey-400"></div>
      <div className="mb-2.5 h-2 rounded-full bg-grey-200 dark:bg-grey-400"></div>
      <div className="h-2 rounded-full bg-grey-200 dark:bg-grey-400"></div>

      <span className="sr-only">Loading...</span>
    </article>
  ))
}

export default CategoryLoader
