import type { IPublisher } from "@/interfaces/publisher.interface"
import api from "./api.interceptor"

export const getAllPublishers = async () => {
    try {
        return (await api.get('/api/publishers')) as IPublisher[]
    } catch (error) {
        return Promise.reject(error)
    }
}

export interface IGetOnePublisherRes {
    message: String
    publisher: IPublisher
}

export const getOne = (id: string) => {
    try {
        return (api.get(`/api/publishers/${id}`)) as Promise<IGetOnePublisherRes> || {}
    } catch (error) {
        return Promise.reject(error)
    }
}

// export const getOneByCode = (code: string) => {
//     try {
//         return (api.get(`/api/publishers`)) as Promise<IGetOnePublisherRes> || {}
//     } catch (error) {
//         return Promise.reject(error)
//     }
// }

export const updateOne = (id: string, data: IPublisher) => {
    try {
        return api.patch(`/api/publishers/${id}`, data)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const create = (data: IPublisher) => {
    try {
        return api.post(`/api/publishers/add`, data)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const deleteOne = (id: string) => {
    try {
        return api.delete(`/api/publishers/${id}`)
    } catch (error) {
        return Promise.reject(error)
    }
}