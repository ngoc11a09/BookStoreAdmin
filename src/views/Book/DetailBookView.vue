<template>
    <a-typography-title :style="{ textAlign: 'Left' }">Book's Information:</a-typography-title>
    <book-form :_id :data @submit="handleSubmit" />

</template>

<script setup lang="ts">
import BookForm from '@/components/BookForm.vue';
import router from '@/router';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { updateOne, type IGetOneBookRes } from '@/api/book.api';
import type { IBook } from '@/interfaces/book.interface';

const route = useRoute()

const data = ref<IGetOneBookRes>()

const _id = route.params.id as string

const handleSubmit = async (data: IBook) => {
    try {
        await updateOne(_id as string, data)
        alert("Update book successfully")
        router.push('/books')
    } catch (error: any) {
        alert(error.message)
    }
}
</script>