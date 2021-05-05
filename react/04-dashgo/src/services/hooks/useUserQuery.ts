import { useQuery } from 'react-query'

import api from '../api'

type User = {
  id: string
  name: string
  email: string
  createdAt: Date
}

interface GetUsersProps {
  users: User[]
  total: number
}

export const getUsers = async (page: number): Promise<GetUsersProps> => {
  const response = await api.get('users', {
    params: {
      page,
    },
  })

  const total = Number(response.headers['x-total-users'])

  const users = response.data.users.map((user: User) => ({
    ...user,
    createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }))

  return {
    users,
    total,
  }
}

const useUserQuery = (page: number) =>
  useQuery(['users', page], () => getUsers(page), { staleTime: 1000 * 60 * 10 })

export default useUserQuery
