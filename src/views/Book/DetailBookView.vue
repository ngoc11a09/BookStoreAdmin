<template>
    <a-typography-title :style="{ textAlign: 'Left' }">Book's Information:</a-typography-title>
    <a-button @click="handleDeleteBook" :wrapper-col="{ offset: 14, span: 2 }" type="primary" danger
        :style="{ margin: '0 0 20px 0' }">
        <DeleteOutlined />
        <span>
            Delete
        </span>
    </a-button>
    <book-form :_id :data @submit="handleSubmit" />

</template>

<script setup lang="ts">
import BookForm from '@/components/BookForm.vue';
import router from '@/router';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { DeleteOutlined } from '@ant-design/icons-vue'
import { deleteOne, updateOne, type IGetOneBookRes } from '@/api/book.api';
import type { IBookInfo } from '@/interfaces/book.interface';

const route = useRoute()

const data = ref<IGetOneBookRes>()

const _id = route.params.id as string

const handleDeleteBook = async () => {
    try {
        await deleteOne(_id)
        alert('Delete book successfully')
        router.push('/books')
    } catch (error: any) {
        alert(error.message)
    }
}

const handleSubmit = async (data: IBookInfo) => {
    try {
        await updateOne(_id as string, data)
        alert("Update book successfully")
        router.push('/books')
    } catch (error: any) {
        alert(error.message)
    }
}
</script>