import { useQuery } from '@tanstack/react-query'
import { EditProfileForm } from '../components'
import backendRequest from '../api/backendRequest'
import { User } from '../types/types'

const EditProfile = () => {
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => backendRequest<User>({ path: '/api/profile/', method: 'GET' }),
  })

  return <div>{data && <EditProfileForm user={data} />}</div>
}

export default EditProfile
