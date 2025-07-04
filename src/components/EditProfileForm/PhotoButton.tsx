type Props = {
  text: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const PhotoButton = ({ text, type = 'button', onClick }: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="mt-[1.44rem] w-full rounded-[100px] border-0.5 border-primary-900 px-[1.81rem] py-[0.625rem] text-d1 text-primary-900 hover:bg-primary-900 hover:text-primary-30 active:scale-95"
    >
      {text}
    </button>
  )
}

export default PhotoButton
