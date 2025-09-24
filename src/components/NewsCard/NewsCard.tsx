import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { z } from 'zod'
import useSubscribeToNewsletter from '../../api/useSubscribeToNewsletter'
import { subscribeSchema } from '../../features/userValidation'
import { Button, Input, SuccessModal } from '../../components'

const NewsCard = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  type FormData = z.infer<typeof subscribeSchema>

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(subscribeSchema),
  })

  const { mutate: subscribe } = useSubscribeToNewsletter()

  const onSubmit = (data: FormData) => {
    subscribe(data, {
      onSuccess: () => {
        reset()
        setIsSuccessModalOpen(true)
      },
      onError: (err) => {
        console.error('Помилка при підписці:', err)
      },
    })
  }

  return (
    <section className="relative min-h-[384px] bg-bg-news bg-cover bg-center bg-no-repeat pt-[100px]">
      {isSuccessModalOpen && (
        <div className="absolute inset-0 z-20 flex items-center justify-center px-2 py-10">
          <div className="w-full max-w-container">
            <SuccessModal onClose={() => setIsSuccessModalOpen(false)} />
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <h2 className="pb-20 text-center text-h2 text-primary-30">Будь у курсі новинок</h2>
        <form className="flex gap-6 pb-24" onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="first_name"
            placeholder="Ім'я"
            register={register}
            error={errors.first_name}
          />
          <Input
            name="email"
            placeholder="E-mail"
            type="email"
            register={register}
            error={errors.email}
          />
          <div>
            <Button
              type="submit"
              text="Підписатися"
              className="light-button text-grey-950"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </section>
  )
}

export default NewsCard
