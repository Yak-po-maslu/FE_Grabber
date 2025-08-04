import { Comments, RecommendedSection } from '../components'

const AdDetails = () => {
  return (
    <div className="mx-auto max-w-container">
      <RecommendedSection slideView={3} text="Вам також може сподобатися" variant="adPage" />
      <Comments />
    </div>
  )
}

export default AdDetails
