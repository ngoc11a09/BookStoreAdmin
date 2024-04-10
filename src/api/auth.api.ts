import type { ISignInData } from '@/interfaces/auth.interface'
import api from './api.interceptor'

export interface ISignInRes {
  message: string
  user: {
    userId: string
    role: 'admin' | 'user'
    username: string
  }
  accessToken: string
}
export const signIn = async (data: ISignInData) => {
  try {
    return (await api.post('/api/signin', data)) as ISignInRes
  } catch (error) {
    return Promise.reject(error)
  }
}
