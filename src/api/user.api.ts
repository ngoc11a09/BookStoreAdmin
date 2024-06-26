import type { IUser, IUserInfo } from "@/interfaces/user.interface"
import api from "./api.interceptor"

export interface IUserRes {
    _id: string
    uId: string
    email: string
    username: string
    name: string
    lastName: string
    birthday: Date | null
    gender: '0' | '1' | 'unknow'
    phone: string
    address: string[]
    createdAt: Date
}

export const getAllUsers = async () => {
    try {
        return (await api.get('/api/users/user')) as IUserRes[]
    } catch (error) {
        return Promise.reject(error)
    }
}

export interface IGetOneUserRes {
    message: String
    user: IUserRes
}

export const getOne = (id: string) => {
    try {
        return (api.get(`/api/users/${id}`)) as Promise<IGetOneUserRes> || {}
    } catch (error) {
        return Promise.reject(error)
    }
}

export const updateOne = (id: string, data: IUserInfo) => {
    try {
        return api.patch(`/api/users/${id}`, data)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const create = (data: IUser) => {
    const role = data.role || 'user'
    try {
        return api.post(`/api/users/add`, { ...data, role })
    } catch (error) {
        return Promise.reject(error)
    }
}

export const deleteOne = (id: string) => {
    try {
        return api.delete(`/api/users/${id}`)
    } catch (error) {
        return Promise.reject(error)
    }
}