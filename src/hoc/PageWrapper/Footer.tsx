import AboutLink from './AboutLink'
import Section from './Section'
import ornament from '../../assets/images/ornament .svg'
import { PATHS } from '../../paths.ts'

const Footer = () => {
  return (
    <div className="min-w-full bg-primary-950">
      <div className="flex justify-evenly py-[80px] text-[#FFFFFF]">
        <Section>
          <h1 className="text-h2 font-medium">Grabber</h1>
          <div>
            <p>
              <a className="text-b3" href="tel:+380 67 56 12 530">
                +380 67 56 12 530
              </a>
            </p>
            <p>
              <a href="mailto:info@grabber.ua">info@grabber.ua</a>
            </p>
          </div>
        </Section>
        <Section>
          <img src={ornament} alt="" />
        </Section>
        <Section>
          <p className="text-s1">ОФІС</p>
          <p>
            вул. Івана Франка 23 <br /> 56 600 Київ
          </p>
          <p>
            ПН - ПТ <br />
            8:00 - 20:00
          </p>
        </Section>
        <Section>
          <p className="text-s1">ДОПОМОГА</p>
          <AboutLink text="Клієнтська підтримка" link={PATHS.SOON} />
          <AboutLink text="Terms & Conditions" link={PATHS.SOON} />
          <AboutLink text="Privacy Policy" link={PATHS.SOON} />
        </Section>
        <Section className="pt-[12px]">
          <AboutLink text="Про нас" />
          <AboutLink text="Категорії" />
          <AboutLink text="Контакти" link={PATHS.SOON} />
          <AboutLink text="FAQ" link={PATHS.FAQ} />
        </Section>
      </div>
    </div>
  )
}

export default Footer
