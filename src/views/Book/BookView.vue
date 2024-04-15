<template>
    <a-typography-title>Manage books:</a-typography-title>
    <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">Add a new book</a-button>
    <a-table :columns="columns" :data-source="data" bordered :pagination="false" :customRow="(record: IBookRes, index: any) => {
        return {
            onClick: () => {
                router.push(`books/${record._id}`)
            }
        }
    }">
        <template #bodyCell="{ column, text } : { column: any, text: any }">
            <template v-if="column.dataIndex === 'publisher'">
                <span>{{ text.name }}</span>
            </template>
            <template v-else-if="column.dataIndex === 'createdAt'">
                <span>{{ formatDateTime(text) }}</span>
            </template>
        </template>
    </a-table>
</template>
<script lang="ts" setup>
import { getAllBooks, type IBookRes } from '@/api/book.api';
import { getAllPublishers } from '@/api/publisher';
import type { IPublisher } from '@/interfaces/publisher.interface';
import router from '@/router';
import { format } from 'date-fns';
import { onMounted, ref } from 'vue';

const formatDateTime = (date: string) => {
    return format(new Date(date), 'dd/MM/yyyy HH:mm:ss');
};
const columns = [
    {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
        width: '10%'
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        width: '30%'
    },
    {
        title: 'Price (VND)',
        dataIndex: 'price',
        key: 'price',
        width: '10%'
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
        width: '5%'
    },
    {
        title: 'Author',
        dataIndex: 'author',
        key: 'author',
        width: '30%'
    },
    {
        title: 'Year of publication',
        dataIndex: 'publishYear',
        key: 'publishYear',
    },
    {
        title: 'Pubisher',
        dataIndex: 'publisher',
        key: 'publisher',
        width: '30%'
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: '10%',
    },
];
const data = ref<IBookRes[]>([])

const handleAdd = () => {
    router.push('/books/add')
}
let publishers: IPublisher[]
onMounted(async () => {
    try {
        const res = await getAllBooks()
        try {
            publishers = (await getAllPublishers())
            const processedPublisher: Record<string, IPublisher> = publishers.reduce((prev, publisher) => {
                return { ...prev, [publisher.code]: publisher }
            }, {})

            data.value = res.map((item) => {
                const publisher = processedPublisher[item.publishCode]
                return { ...item, publisher }
            })

        } catch (error) {
            alert('Cannot get publishers. Please try again')
        }
    } catch (error) {
        alert('Cannot get all books')
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