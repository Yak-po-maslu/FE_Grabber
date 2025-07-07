import { Button, Input } from '../../components'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { subscribeSchema } from '../../features/userValidation'
import type { z } from 'zod'
import useSubscribeToNewsletter from '../../api/useSubscribeToNewsletter'
import { SuccessModal } from '../../components'
import { useState } from 'react'

const NewsCard = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  type FormData = z.infer<typeof subscribeSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
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
    <div className="relative min-h-[384px]">
      {isSuccessModalOpen && (
        <div className="absolute left-0 right-0 top-0 z-20 flex justify-center">
          <div className="w-full max-w-[1200px] py-[25px]">
            <SuccessModal
              onClose={() => setIsSuccessModalOpen(false)}
              disablePortal
              modalClassName="!static !inset-0 !bg-transparent left-0 right-0 top-[50px] bottom-[50px] "
            />
          </div>
        </div>
      )}

      <div className="relative bg-bg-news bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 mx-auto max-w-[1200px] px-4">
          <h2 className="py-20 text-center text-h3 text-primary-30">Будь у курсі новинок</h2>
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
            <Button
              type="submit"
              text="Підписатися"
              className="rounded-[30px] bg-primary-30 text-grey-950"
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewsCard
