export interface IBook {
    _id: string;
    code: string;
    title: string;
    price: number;
    quantity: number;
    publishYear: number;
    publisher: string;
    author: string;
    createdAt: Date
    updatedAt: Date
}

export interface IBookInfo {
    code: string;
    title: string;
    price: number | null;
    quantity: number | null;
    publishYear: number | null;
    publishCode: string;
    author: string;
}