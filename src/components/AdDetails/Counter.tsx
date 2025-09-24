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
    <div className="spacing flex h-[40px] w-[200px] items-center overflow-hidden rounded-[40px] border-2 border-gray-400">
      <button
        className="flex-1 bg-grey-100 text-h3 text-grey-400 transition hover:bg-grey-200"
        onClick={() => handleChange(-1)}
      >
        -
      </button>
      <span className="w-12 flex-none text-center text-grey-400">{count}</span>
      <button
        className="flex-1 bg-grey-100 text-h3 text-grey-400 transition hover:bg-grey-200"
        onClick={() => handleChange(+1)}
      >
        +
      </button>
    </div>
  )
}

export default Counter
