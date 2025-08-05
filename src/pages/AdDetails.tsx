import { useParams } from 'react-router-dom'
import { RecommendedSection, AdInfo } from '../components'

const AdDetails = () => {
  const { ad_id } = useParams()
  if (!ad_id) return null

  return (
    <div>
      <AdInfo ad_id={ad_id} />
      <RecommendedSection slideView={3} text="Вам також може сподобатися" variant="adPage" />
    </div>
  )
}

export default AdDetails
