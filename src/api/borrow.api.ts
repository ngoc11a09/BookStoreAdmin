import api from "./api.interceptor"

export interface IBorrowRes {
    _id?: string
    code: string
    userCode: string
    bookCode: string
    returnDate: Date | null
    borrowedDate: Date | null
    createdAt?: Date
    updatedAt?: Date
}

export const getAllBorrows = async () => {
    try {
        return (await api.get('/api/borrows')) as IBorrowRes[]
    } catch (error) {
        return Promise.reject(error)
    }
}

export const getOne = (id: string) => {
    try {
        return (api.get(`/api/borrows/${id}`)) as Promise<IBorrowRes>
    } catch (error) {
        // console.log(error);
        return Promise.reject(error)
    }
}

export const updateOne = (id: string, data: IBorrowRes) => {
    try {
        return api.put(`/api/borrows/${id}`, data)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const create = (data: IBorrowRes) => {
    try {
        return api.post(`/api/borrows/add`, data)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const deleteOne = (id: string) => {
    try {
        return api.delete(`/api/borrows/${id}`)
    } catch (error) {
        return Promise.reject(error)
    }
}