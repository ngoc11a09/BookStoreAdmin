export interface IUserInfo {
    name: string
    lastName: string
    birthday: Date | null
    gender: '0' | '1' | 'unknow' | null
    phone: string
    address: string[]
}

export interface IUser {
    email: string | undefined
    password: string | undefined
    username: string | undefined
    name: string
    lastName: string
    birthday: Date | null
    gender: '0' | '1' | 'unknow'
    phone: string
    address: string[]
    role?: 'user' | 'admin'
}