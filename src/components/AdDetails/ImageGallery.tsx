import { useState } from 'react'
import ZoomIcon from '../../assets/icons/zoom.svg?react'
import { FavoriteIcon, Modal } from '../../components'

type Props = {
  images: string[]
  title: string
  product_id: string
}

const ImageGallery = ({ images, title, product_id }: Props) => {
  const [mainImage, setMainImage] = useState(images[0])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const thumbnails = images.filter((img) => img !== mainImage).slice(0, 3)

  const handleImageClick = (clickedImg: string) => {
    setMainImage(clickedImg)
  }

  const handleZoomClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative h-[477px] w-[590px] overflow-hidden rounded-[20px]">
        <img
          src={mainImage}
          alt={`${title} main`}
          className="h-full w-full rounded-[20px] object-cover"
        />
        <button onClick={handleZoomClick} className="absolute left-4 top-4">
          <ZoomIcon className="text-primary-50" />
        </button>
        <div className="absolute right-4 top-4">
          <FavoriteIcon product_id={product_id} />
        </div>
      </div>

      <div className="flex gap-4">
        {thumbnails.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${title} thumbnail ${idx + 1}`}
            onClick={() => handleImageClick(img)}
            className="h-[142px] w-[183px] cursor-pointer rounded-[20px] border object-cover transition hover:opacity-80"
          />
        ))}
      </div>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <div className="flex h-[50vh] w-[40vw] items-center justify-center">
            <img
              src={mainImage}
              alt={`${title} zoomed`}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
        </Modal>
      )}
    </div>
  )
}

export default ImageGallery
