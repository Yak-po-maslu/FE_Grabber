import './App.css'
import { useFetchData } from './hooks/useFetchData'

type ServerResponse = {
  id: number
  name: string
}

function App() {
  const { data, error, loading, fetchData } = useFetchData<ServerResponse>()

  const handleClickButton = () => {
    fetchData('/')
  }

  return (
    <div className="wrap">
      <button type="button" onClick={handleClickButton}>
        Відправити запит на сервер
      </button>

      {loading && <p>Loading...</p>}

      {error && <h1>Упс! Нажаль під час отримання даних від сервера сталася помилка 🤷‍♂️</h1>}

      {data && (
        <div className="content">
          <p>Id: {data.id}</p>
          <p>Name: {data.name}</p>
        </div>
      )}
    </div>
  )
}

export default App
