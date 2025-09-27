import frameImg from '../../assets/images/ornament_frame_filters.svg'

type SearchPanelFrameProps = {
  children: React.ReactNode
  repeatX: number
  repeatY: number
  height: number
}

export const SearchPanelFrame = ({
  children,
  repeatX = 2,
  repeatY = 1,
  height = 1,
}: SearchPanelFrameProps) => {
  return (
    <div
      className={`relative z-10 h-fit w-full rounded-[20px] border border-solid border-black bg-primary-950 text-white`}
    >
      {/* Контент */}
      <div className="relative z-10">{children}</div>
      {/* Ліва рамка */}
      <div
        className={`absolute left-0 top-0 z-0 flex h-full -translate-x-[78%] flex-col items-center justify-center overflow-hidden`}
      >
        {Array.from({ length: repeatY }).map((_, index) => (
          <img
            src={frameImg}
            alt="frame"
            key={index}
            className={`aspect-[35/21] -rotate-90`}
            style={{ height: `${height}px` }}
          />
        ))}
      </div>

      {/* Верхня рамка */}
      <div
        className={`absolute left-0 top-0 z-0 flex w-full -translate-y-[96%] justify-evenly overflow-hidden`}
      >
        {Array.from({ length: repeatX }).map((_, index) => (
          <img
            src={frameImg}
            alt="frame"
            key={index}
            className="aspect-[35/21] h-full w-auto"
            style={{ height: `${height}px` }}
          />
        ))}
      </div>

      {/* Права рамка */}
      <div
        className={`absolute right-0 top-0 z-0 flex h-full translate-x-[78%] flex-col items-center justify-center overflow-hidden`}
      >
        {Array.from({ length: repeatY }).map((_, index) => (
          <img
            src={frameImg}
            alt="frame"
            key={index}
            className="aspect-[35/21] w-full rotate-90"
            style={{ height: `${height}px` }}
          />
        ))}
      </div>

      {/* Нижня рамка */}
      <div
        className={`absolute bottom-0 left-0 z-0 flex w-full translate-y-[96%] justify-evenly overflow-hidden`}
      >
        {Array.from({ length: repeatX }).map((_, index) => (
          <img
            src={frameImg}
            alt="frame"
            key={index}
            className="aspect-[35/21] h-full w-auto rotate-180"
            style={{ height: `${height}px` }}
          />
        ))}
      </div>
    </div>
  )
}
