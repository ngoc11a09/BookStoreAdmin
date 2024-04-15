<template>
    <a-typography-title>Manage borrow:</a-typography-title>
    <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">Add new borrow</a-button>
    <a-table :columns="columns" :data-source="data" bordered :pagination="false" :customRow="(record: IBorrowRes, index: any) => {
        return {
            onClick: () => {
                router.push(`borrows/${record._id}`)
            }
        }
    }">
        <template #bodyCell="{ column, text } : { column: any, text: any }">
            <template v-if="column.dataIndex === 'user'">
                <span>{{ text.username }}</span>
            </template>
            <template v-else-if="column.dataIndex === 'book'">
                <span>{{ text.title }}</span>
            </template>
            <template v-else-if="column.dataIndex === 'returnDate'">
                <span>{{ formatDate(text) }}</span>
            </template>
            <template v-else-if="column.dataIndex === 'borrowedDate'">
                <span>{{ formatDate(text) }}</span>
            </template>
            <template v-else-if="column.dataIndex === 'createdAt'">
                <span>{{ formatDateTime(text) }}</span>
            </template>
        </template>
    </a-table>
</template>
<script lang="ts" setup>
import { getAllBooks, type IBookRes } from '@/api/book.api';
import { getAllBorrows, type IBorrowRes } from '@/api/borrow.api';
import { getAllUsers, type IUserRes } from '@/api/user.api';
import router from '@/router';
import { onMounted, ref } from 'vue';
import { format } from 'date-fns';

const columns = [
    {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
        width: '10%'
    },
    {
        title: 'Borrower',
        dataIndex: 'user',
        key: 'user',
        width: '20%'
    },
    {
        title: 'Book title',
        dataIndex: 'book',
        key: 'book',
        width: '20%'
    },
    {
        title: 'Borrow date',
        dataIndex: 'borrowedDate',
        key: 'borrowedDate',
        width: '20%'
    },
    {
        title: 'Return date',
        dataIndex: 'returnDate',
        key: 'returnDate',
        width: '20%'
    },
    {
        title: 'Created at',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: '20%'
    },
];

const data = ref<IBorrowRes[]>([])

const handleAdd = () => {
    router.push('/borrows/add')
}
const formatDate = (date: string) => {
    return format(new Date(date), 'dd/MM/yyyy');
};
const formatDateTime = (date: string) => {
    return format(new Date(date), 'dd/MM/yyyy HH:mm:ss');
};
let users: IUserRes[]
let books: IBookRes[]
onMounted(async () => {
    try {
        const res = await getAllBorrows()

        users = await getAllUsers()
        const preUser: Record<string, IUserRes> = users.reduce((prev, user) => {
            return { ...prev, [user.uId]: user }
        }, {})

        books = await getAllBooks()
        const preBook: Record<string, IBookRes> = books.reduce((prev, book) => {
            return { ...prev, [book.code]: book }
        }, {})

        data.value = res.map((item) => {
            const user = preUser[item.userCode]
            const book = preBook[item.bookCode]
            return { ...item, user, book }
        })

    } catch (error) {
        alert('Cannot get all borrows')
    }
})
</script>
<style>
.delete-btn:hover {
    color: #D33A2C !important;
    background-color: #FFE7E7 !important;
}

.text-center {
    text-align: center;
}

.editable-add-btn {
    margin-bottom: 8px;
}

.ant-table-row:hover {
    cursor: pointer;
    color: #1677ff;
}
</style>