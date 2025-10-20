import { useState } from 'react'
import LocationIcon from '../../assets/icons/location-icon.svg?react'
import useAdDetails from '../../api/useAdDetails.ts'
import useCartStore from '../../store/cartStore.ts'
import { Button, ImageGallery, Counter } from '../../components'

type Props = {
  ad_id: string
}

const AdInfo = ({ ad_id }: Props) => {
  const { data, isLoading } = useAdDetails(ad_id)
  const [count, setCount] = useState(1)
  const addToCart = useCartStore((state) => state.addToCart)

  if (isLoading || !data || data.id === undefined) return null

  const handleAddToCart = () => {
    addToCart({
      id: String(data.id),
      title: data.title,
      image: data.images?.[0],
      quantity: count,
    })
    setCount(1)
  }

  return (
    <div className="m-auto mb-[160px] flex max-w-container flex-col gap-[46px] pt-8">
      <p className="text-b3 text-grey-400">
        Категорії / <span className="text-b3 text-grey-800">{data.category}</span>
      </p>

      <div className="flex gap-[100px]">
        <div className="w-1/2">
          <div className="flex min-h-[650px] flex-wrap gap-2">
            {data.images?.length > 0 && (
              <ImageGallery images={data.images} title={data.title} product_id={data.id} />
            )}
          </div>
        </div>

        <div className="flex w-1/2 flex-col">
          <h2 className="title-h2 pb-8">{data.title}</h2>
          <p className="description-add min-h-[250px] pb-8">{data.description}</p>

          <div className="pb-[61px]">
            <span className="description-info pb-2">Місце виготовлення виробу</span>
            <div className="flex items-center gap-4">
              <LocationIcon className="text-primary-950" />
              <span className="text-b2 text-grey-950">{data.location}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 pb-8">
            <p className="text-b1 text-grey-950">{data.price} грн.</p>
            <span className="description-info">
              Вартість доставки розраховується при оформленні замовлення
            </span>
          </div>

          <span className="description-info pb-2">Кількість</span>
          <div className="flex gap-6">
            <Counter count={count} setCount={setCount} />
            <Button
              text="Додати в кошик"
              className="h-[40px] min-w-btn-medium py-0"
              onClick={(e) => {
                handleAddToCart()
                ;(e.currentTarget as HTMLButtonElement).blur()
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdInfo
