import { Link } from 'react-router-dom'
import useFetchCategories from '../../api/useFetchCategories'
import { PATHS } from '../../paths'

const CategoriesMenu = () => {
  const { data, isSuccess } = useFetchCategories()

  return (
    <>
      {isSuccess && (
        <div className="absolute right-[1px] top-[47px] z-10 min-w-[156px] rounded-[20px] bg-primary-50 text-center text-b4 text-grey-800 shadow-[4px_4px_16px_0px_#00000026]">
          <nav>
            <ul>
              <Link to={`${PATHS.SOON}`}>
                <li className="rounded-t-[20px] p-3 hover:bg-secondary-brown-100">Всі категорії</li>
              </Link>
              {data?.map((item, index) => (
                <Link key={index} to={`${PATHS.SOON}`}>
                  <li
                    className={`p-3 hover:bg-secondary-brown-100 ${index === data.length - 1 && 'rounded-b-[20px]'}`}
                  >
                    {item.name}
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  )
}

export default CategoriesMenu
