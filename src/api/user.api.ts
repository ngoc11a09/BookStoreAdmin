import type { IUserCreate, IUserInfo } from "@/interfaces/user.interface"
import api from "./api.interceptor"

export const getAll = () => {
    return api.get('/api/users')
}

export const getOne = (id: string) => {
    return api.get(`/api/users/${id}`)
}

export const updateOne = (id: string, data: IUserInfo) => {
    return api.put(`/api/users/${id}`, data)
}

export const create = (data: IUserCreate) => {
    return api.post(`/api/users/add`, data)
}