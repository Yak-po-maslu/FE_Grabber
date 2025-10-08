import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import useFetchRecommended from '../../../api/useFetchRecommended.ts'
import { RecommendedCard } from '../../../components'

type RecommendedSectionProps = {
  text?: string
  slideView?: number
  variant?: 'home' | 'adPage'
  className?: string
}

const RecommendedSection = ({
  slideView,
  text,
  variant = 'home',
  className,
}: RecommendedSectionProps) => {
  const { data: recommendedAds, isLoading, isError } = useFetchRecommended()

  if (isLoading) return <p>Завантаження...</p>
  if (isError) return <p>Сталася помилка при завантаженні</p>

  return (
    <section className={`relative mx-auto mb-[96px] max-w-container ${className}`}>
      <h2 className="pb-8 text-h31">{text}</h2>

      <div className={variant === 'home' ? 'relative h-[491px]' : 'relative h-[513px]'}>
        <Swiper
          spaceBetween={20}
          slidesPerView={slideView}
          slidesPerGroup={1}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: slideView,
            },
          }}
          className="overflow-visible"
        >
          {recommendedAds?.map((ad) => (
            <SwiperSlide key={ad.id}>
              <RecommendedCard key={ad.id} ad={ad} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default RecommendedSection
