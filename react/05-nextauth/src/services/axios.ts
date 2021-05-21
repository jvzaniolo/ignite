import axios, { AxiosError } from 'axios'
import { setCookie, parseCookies } from 'nookies'
import { signOut } from '../contexts/AuthContext'

let cookies = parseCookies()
let isRefreshing = false
let failedRequestsQueue = []

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${cookies['next-auth.token']}`,
  },
})

api.interceptors.response.use(
  resolve => resolve,
  (reject: AxiosError) => {
    if (reject.response.status === 401) {
      if (reject.response.data?.code === 'token.expired') {
        cookies = parseCookies()

        const originalConfig = reject.config
        const { 'next-auth.refreshToken': refreshToken } = cookies

        if (!isRefreshing) {
          isRefreshing = true

          api
            .post('refresh', {
              refreshToken,
            })
            .then(response => {
              setCookie(undefined, 'next-auth.token', response.data.token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
              })
              setCookie(
                undefined,
                'next-auth.refreshToken',
                response.data.refreshToken,
                {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: '/',
                }
              )

              api.defaults.headers[
                'Authorization'
              ] = `Bearer ${response.data.token}`

              failedRequestsQueue.forEach(request =>
                request.onSuccess(response.data.token)
              )
              failedRequestsQueue = []
            })
            .catch(err => {
              failedRequestsQueue.forEach(request => request.onFailure(err))
              failedRequestsQueue = []
            })
            .finally(() => {
              isRefreshing = false
            })
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers['Authorization'] = `Bearer ${token}`

              resolve(api(originalConfig))
            },
            onFailure: (error: AxiosError) => {
              reject(error)
            },
          })
        })
      } else {
        signOut()
      }
    }

    return Promise.reject(reject)
  }
)
