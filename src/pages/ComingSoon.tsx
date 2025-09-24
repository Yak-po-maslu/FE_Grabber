import Ornament from '../assets/images/Ornament.svg?react'
import OrnamentHearts from '../assets/images/Hearts.svg?react'
import { PATHS } from '../paths.ts'

const ComingSoon = () => {
  return (
    <section className="m-auto flex max-w-container flex-col items-center pb-[182px] pt-[64px]">
      <Ornament />
      <h1 className="pb-4 pt-[48px] font-kyiv text-h21">
        Сторінка буде розроблена <br /> на наступній стадії проєкту
      </h1>
      <p className="pb-8 text-b2">А поки - купуйте товари місцевих виробників</p>
      <a href={PATHS.HOME} className="button mb-[64px] w-[224px] px-8 py-3 text-center">
        Купити
      </a>
      <OrnamentHearts />
    </section>
  )
}

export default ComingSoon
