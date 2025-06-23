import React from 'react'

interface CategoryLoaderProps {
  countItems: number
}

const CategoryLoader: React.FC<CategoryLoaderProps> = ({ countItems }) => {
  return Array.from({ length: countItems }).map((_, index) => (
    <article
      className="dark:border-grey-400 grid max-w-sm animate-pulse grid-cols-1 grid-rows-[auto_auto_1fr] overflow-hidden rounded-2xl border border-grey-200 p-4 p-6 shadow md:p-6"
      key={'categoryLoader_' + index}
    >
      <div className="bg-grey-300 dark:bg-grey-400 mb-4 flex h-48 items-center justify-center rounded-lg">
        <svg
          viewBox="0 0 16 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="h-10 w-10 text-grey-200 dark:text-grey-200"
        >
          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"></path>
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"></path>
        </svg>
      </div>
      <div className="dark:bg-grey-400 mb-4 h-2.5 w-48 rounded-full bg-grey-200"></div>
      <div className="dark:bg-grey-400 mb-2.5 h-2 rounded-full bg-grey-200"></div>
      <div className="dark:bg-grey-400 mb-2.5 h-2 rounded-full bg-grey-200"></div>
      <div className="dark:bg-grey-400 h-2 rounded-full bg-grey-200"></div>

      <span className="sr-only">Loading...</span>
    </article>
  ))
}

export default CategoryLoader
