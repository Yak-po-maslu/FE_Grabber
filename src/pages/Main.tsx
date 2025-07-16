import { CategoriesSection, RecommendedSection, NewsCard, FAQSection } from '../components'

const Main = () => {
  return (
    <div>
      <CategoriesSection />
      <RecommendedSection slideView={2} text="Вам може сподобатися" variant="home" />
      <NewsCard />
      <FAQSection />
    </div>
  )
}

export default Main
