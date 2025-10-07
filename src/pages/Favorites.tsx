import HeartsIcon from '../assets/icons/hearts.svg?react'
import HeartsIconLeft from '../assets/icons/hearts-left.svg?react'
import HeartsIconRight from '../assets/icons/hearts-right.svg?react'
import useFavorites from '../api/useFavorites.ts'
import { RecommendedCard } from '../components'

const Favorites = () => {
  const { data: favorites, isLoading, isError } = useFavorites()

  if (isLoading) {
    return <p>Завантаження...</p>
  }

  if (isError) {
    return <p>Сталася помилка. Спробуйте ще раз.</p>
  }

  if (!favorites || favorites.length === 0) {
    return (
      <section className="m-auto mt-[220px] flex max-w-container flex-col items-center">
        <h1 className="pb-[64px] text-center font-kyiv text-h21">
          Тут з’являться оголошення, <br /> які ви вподобали
        </h1>
        <HeartsIcon className="mb-[298px]" />
      </section>
    )
  }

  return (
    <section className="m-auto mb-[160px] mt-[220px] flex max-w-container flex-col items-center">
      <div className="mb-[80px] flex items-center gap-2">
        <HeartsIconLeft />
        <h2 className="text-h31">Оголошення, які вам сподобалися</h2>
        <HeartsIconRight />
      </div>
      <div className="grid grid-cols-3 grid-rows-2 gap-5">
        {favorites.map((ad) => (
          <RecommendedCard
            cardClassName="max-w-[387px] flex-1 max-h-[547px] "
            key={ad.id}
            ad={ad}
          />
        ))}
      </div>
    </section>
  )
}

export default Favorites
