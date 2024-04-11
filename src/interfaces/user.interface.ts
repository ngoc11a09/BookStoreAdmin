export interface IUserInfo {
    name: string
    lastName: string
    birthday: Date | null
    gender: '0' | '1' | 'unknow' | null
    phone: string
    address: string[]
}

export interface IUserCreate {
    email: string
    password: string
    username: string
    name: string
    lastName: string
    birthday: Date | null
    gender: '0' | '1' | 'unknow'
    phone: string
    address: string[]
}