type Props = {
  text: string
  data?: string
  icon?: React.ReactNode
}

const UserInfoItem = ({ text, data, icon }: Props) => {
  return (
    <>
      <p className="mb-[8px] text-d1 text-grey-600">{text}</p>
      {icon}
      <p className="mb-[24px] text-b3 text-grey-950 [overflow-wrap:anywhere]">{data}</p>
    </>
  )
}

export default UserInfoItem
