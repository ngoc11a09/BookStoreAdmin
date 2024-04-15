import type { IBook, IBookInfo } from "@/interfaces/book.interface"
import api from "./api.interceptor"
import type { IPublisher } from "@/interfaces/publisher.interface"

export interface IBookRes {
    _id: string
    code: string
    title: string
    price: number
    quantity: number;
    publishYear: number;
    publishCode: string;
    publisher?: IPublisher;
    author: string;
    createdAt: Date
    updatedAt: Date
}

export const getAllBooks = async () => {
    try {
        return (await api.get('/api/books')) as IBookRes[]
    } catch (error) {
        return Promise.reject(error)
    }
}

export interface IGetOneBookRes {
    message: String
    book: IBookRes
}

export const getOne = (id: string) => {
    try {
        return (api.get(`/api/books/${id}`)) as Promise<IGetOneBookRes> || {}
    } catch (error) {
        return Promise.reject(error)
    }
}

export const updateOne = (id: string, data: IBookInfo) => {
    try {
        return api.put(`/api/books/${id}`, data)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const create = (data: IBook) => {
    try {
        return api.post(`/api/books/add`, data)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const deleteOne = (id: string) => {
    try {
        return api.delete(`/api/books/${id}`)
    } catch (error) {
        return Promise.reject(error)
    }
}