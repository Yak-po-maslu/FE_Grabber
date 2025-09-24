import SupportAvatar from '../../../assets/images/supportAvatar.svg?react'
import Button from '../../Button/Button.tsx'

const QuestionPrompt = () => {
  return (
    <div className="mt-16 flex flex-col items-center">
      <SupportAvatar className="mb-8 mt-8" />
      <p className="mb-[12px] text-h3 text-grey-950">Ще є питання?</p>
      <p className="mb-8 text-b2 text-grey-500">
        Не знайшли відповідь на своє питання? Напишіть нам!
      </p>
      <a target="_blank" rel="noopener noreferrer" href="mailto:info@grabber.ua">
        <Button text="Запитати" className="custom-button text-b3" />
      </a>
    </div>
  )
}

export default QuestionPrompt
