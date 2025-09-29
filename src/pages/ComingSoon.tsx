import { Link } from 'react-router-dom'
import Group from '../assets/icons/group.svg?react'
import RedArrowLeft from '../assets/icons/red-arrow-left.svg?react'
import RedArrowRight from '../assets/icons/red-arrow-right.svg?react'
import { PATHS } from '../paths.ts'
import { Button } from '../components'

const ComingSoon = () => {
  const arrows = Array.from({ length: 9 })

  return (
    <section className="m-auto flex max-w-container flex-col items-center pb-[182px] pt-[64px]">
      <div className="relative flex w-full items-center justify-center">
        <div className="absolute left-0 flex w-[800px] overflow-hidden">
          <div className="flex animate-arrow-left gap-2">
            {arrows.map((_, i) => (
              <RedArrowLeft key={`left-${i}`} />
            ))}
          </div>
        </div>

        <Group />

        <div className="absolute right-0 flex w-[-800px] overflow-hidden">
          <div className="flex animate-arrow-right gap-2">
            {arrows.map((_, i) => (
              <RedArrowRight key={`right-${i}`} />
            ))}
          </div>
        </div>
      </div>

      <h1 className="pb-4 pt-[48px] font-kyiv text-h21">
        Сторінка буде розроблена <br /> на наступній стадії проєкту
      </h1>
      <p className="pb-8 text-b2">А поки - купуйте товари місцевих виробників</p>
      <Link to={PATHS.HOME}>
        <Button className="button mb-[64px] w-[224px] px-8 py-3 text-center" text="Купити" />
      </Link>
    </section>
  )
}

export default ComingSoon
