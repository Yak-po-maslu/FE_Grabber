import useFetchPopularProducts from '../../api/useFetchPopularProducts'
import RecommendedCard from '../Recommended/RecommendedCard/RecommendedCard'

const PopularSection = () => {
  const { data } = useFetchPopularProducts()

  return (
    <section className="m-auto mb-[64px] max-w-[1200px]">
      <h2 className="mb-8 text-h31">Популярні товари</h2>
      <div className="grid grid-cols-3 grid-rows-2 gap-5">
        {data &&
          data.map((product) => (
            <RecommendedCard
              cardClassName="max-w-[387px] flex-1 max-h-[547px] "
              key={product.id}
              ad={product}
            />
          ))}
      </div>
    </section>
  )
}

export default PopularSection
