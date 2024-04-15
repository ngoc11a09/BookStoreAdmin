<template>
    <a-typography-title :style="{ textAlign: 'Left' }">Add borrow:</a-typography-title>

    <borrow-form @submit="onSubmit" />

</template>

<script setup lang="ts">
import { create } from '@/api/borrow.api';
import BorrowForm from '@/components/BorrowForm.vue';
import router from '@/router';
const onSubmit = async (data: any) => {
    try {
        await create(data)
        alert("Add a new borrow successfully")
        router.push('/borrows')
    } catch (error: any) {
        alert(error.message)
    }
}

</script>