export interface IBook {
    _id?: string;
    code: string;
    title: string;
    price: number | null;
    quantity: number | null;
    publishYear: number | null;
    publishCode: string;
    author: string;
    createdAt?: Date
    updatedAt?: Date
}
