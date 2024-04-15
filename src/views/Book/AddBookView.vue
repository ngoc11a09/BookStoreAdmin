<template>
    <a-typography-title :style="{ textAlign: 'Left' }">Add book:</a-typography-title>

    <book-form @submit="onSubmit" />

</template>

<script setup lang="ts">
import { create } from '@/api/book.api';
import BookForm from '@/components/BookForm.vue';
const onSubmit = async (data: any) => {
    try {
        await create(data)
        alert("Add a new book successfully")
    } catch (error: any) {
        alert(error.message)
    }
}

</script>