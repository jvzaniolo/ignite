import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query'

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

export default function useUserQuery (page: number, options: UseQueryOptions<GetUsersProps>) {
  return useQuery(['users', page], () => getUsers(page), { staleTime: 1000 * 60 * 10, ...options })
}

