import { RecommendedCard } from '../../components'
import useFetchRecommended from '../../api/useFetchRecommended'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import ArrowLeftIcon from '../../assets/icons/arrow-left.svg?react'
import ArrowRight from '../../assets/icons/arrow-right.svg?react'
import 'swiper/css'
import 'swiper/css/navigation'

const RecommendedSection = () => {
  const { data: recommendedAds, isLoading, isError } = useFetchRecommended()

  if (isLoading) return <p>Завантаження...</p>
  if (isError) return <p>Сталася помилка при завантаженні</p>

  return (
    <section className="relative mx-auto max-w-[1200px] pb-24 pt-16">
      <h2 className="pb-8 text-center text-h3">Вам може сподобатися</h2>
      <button className="swiper-button-prev absolute left-[-16px] top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-grey-200 bg-white shadow-md">
        <ArrowLeftIcon className="h-8 w-8 text-gray-400" />
      </button>

      <button className="swiper-button-next absolute right-[-16px] top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full border border-grey-200 bg-white shadow-md">
        <ArrowRight className="h-8 w-8 text-gray-400" />
      </button>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={2}
        slidesPerGroup={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
      >
        {recommendedAds?.map((ad) => (
          <SwiperSlide key={ad.id}>
            <RecommendedCard ad={ad} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default RecommendedSection
