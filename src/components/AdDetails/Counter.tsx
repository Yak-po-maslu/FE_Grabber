type Props = {
  count: number
  setCount: (value: number) => void
}

const Counter = ({ count, setCount }: Props) => {
  const handleChange = (num: number) => {
    const newCount = Math.max(count + num, 1)
    setCount(newCount)
  }

  return (
    <div className="flex h-[40px] w-[200px] items-center justify-between gap-8 rounded-[40px] border-2 border-gray-200 p-2">
      <button className="text-h3 text-grey-400" onClick={() => handleChange(-1)}>
        -
      </button>
      <span>{count}</span>
      <button className="text-h3 text-grey-400" onClick={() => handleChange(+1)}>
        +
      </button>
    </div>
  )
}

export default Counter
