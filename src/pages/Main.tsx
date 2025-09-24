import { Link } from 'react-router-dom'
import { RecommendedSection, AnimationSection, SliderSection, PopularSection } from '../components'
import { PATHS } from '../paths'
import BuySellSection from '../components/MainSections/BuySellSection'

const Main = () => {
  return (
    <div>
      <AnimationSection />
      <SliderSection />
      <PopularSection />
      <RecommendedSection slideView={2} text="Вам може сподобатися" variant="home" />
      <BuySellSection />
      <div className="my-[96px] text-center">
        <p className="mb-6 text-h31">Є питання? У нас є відповіді!</p>
        <Link to={PATHS.FAQ}>
          <button className="light-button border border-primary-950 bg-white text-b4 text-grey-950">
            Перейти до FAQ
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Main
