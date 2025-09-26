import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import sliderImg from '../../assets/images/frame334.jpg'
import sliderImg2 from '../../assets/images/frame332.jpg'
import ArrowLeft from '../../assets/icons/arrow-left.svg?react'
import ArrowRight from '../../assets/icons/arrow-right.svg?react'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import SliderBlock from './SliderBlock'
import { PATHS } from '../../paths.ts'
import { useState } from 'react'
import SwiperCore from 'swiper'

type SliderSectionProps = {
  styles?: string
}

const SliderSection = ({ styles = '' }: SliderSectionProps) => {
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const handleSwiper = (swiper: SwiperCore) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  return (
    <div className={`relative mx-auto max-w-container ${styles}`}>
      <button
        className={`swiper-button-prev group absolute left-[-40px] top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-secondary-brown-100 transition-colors hover:text-secondary-brown-100 active:text-primary-950${
          isBeginning ? 'pointer-events-none opacity-0' : ''
        }`}
      >
        <ArrowLeft className="arrowIcon" />
      </button>
      <Swiper
        className="max-h-[450px]"
        modules={[Navigation]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        slidesPerView={1}
        onSwiper={handleSwiper}
        onSlideChange={handleSwiper}
      >
        <SwiperSlide className="m-auto">
          <SliderBlock
            primaryText={
              <>
                Вироби ручної роботи <br /> напряму від майстрів
              </>
            }
            secondaryText="Підтримайте місцевих кравців та кравчинь"
            sliderImg={sliderImg}
            buttonText="Ознайомитися"
            path={PATHS.SOON}
          />
        </SwiperSlide>
        <SwiperSlide className="m-auto">
          <SliderBlock
            primaryText={<>Обирайте за виробником</>}
            secondaryText="Дивіться колекцію від виробника у єдиному стилі"
            sliderImg={sliderImg2}
            buttonText="Ознайомитися"
            path={PATHS.SOON}
          />
        </SwiperSlide>
      </Swiper>
      <button
        className={`swiper-button-next group absolute right-[-40px] top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-secondary-brown-100 transition-colors hover:text-secondary-brown-100 active:text-primary-950${
          isEnd ? 'pointer-events-none opacity-0' : ''
        }`}
      >
        <ArrowRight className="arrowIcon" />
      </button>
    </div>
  )
}

export default SliderSection
