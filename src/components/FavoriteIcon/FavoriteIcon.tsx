import HeartIcon from '../../assets/icons/heart.svg?react'
import useFavorites from '../../api/useFavorites.ts'
import useToggleFavorite from '../../api/useToggleFavorite'

type FavoriteIconProps = {
  product_id: string
  addClass?: string
}

const FavoriteIcon = ({ product_id, addClass = '' }: FavoriteIconProps) => {
  const { data: favorites = [], isLoading } = useFavorites()
  const toggleFavorite = useToggleFavorite()

  if (isLoading) return null

  const isFavorite = favorites.some((item) => item.id.toString() === product_id.toString())

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    e.preventDefault()
    console.log(isFavorite)
    toggleFavorite.mutate({ product_id, favorite: !isFavorite })
  }

  return (
    <button
      onClick={(e) => handleClick(e)}
      aria-label="Toggle favorite"
      className={`${isFavorite ? 'text-primary-950' : 'text-primary-50'} ${addClass}`}
    >
      <HeartIcon className="transition-colors" fill={isFavorite ? 'currentColor' : 'none'} />
    </button>
  )
}

export default FavoriteIcon
