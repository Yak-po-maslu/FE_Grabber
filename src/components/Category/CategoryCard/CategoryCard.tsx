import React from 'react'
import { TCategory } from '../../../types/categoryTypes.ts'

interface CategoryCardProps extends TCategory {}

const CategoryCard: React.FC<CategoryCardProps> = ({ description, image, name }) => {
  return (
    <article className="grid grid-cols-1 grid-rows-[auto_auto_1fr] overflow-hidden p-6">
      <img
        src={image}
        alt={`Зображення категорії ${name}`}
        className="mb-6 aspect-square w-full rounded-xl object-cover"
      />
      <h2 className="mb-2 self-start text-s1">{name}</h2>
      <p className="self-start text-b4">{description}</p>
    </article>
  )
}

export default CategoryCard
