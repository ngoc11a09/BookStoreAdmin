<template>
    <a-typography-title :style="{ textAlign: 'Left' }">Add user:</a-typography-title>

    <user-form @submit="onSubmit" />

</template>

<script setup lang="ts">
import { create } from '@/api/user.api';
import UserForm from '@/components/UserForm.vue'
import router from '@/router';
const onSubmit = async (data: any) => {
    try {
        await create(data)
        alert("Add a new user successfully")
        router.push('/users')
    } catch (error: any) {
        alert(error.message)
    }
}

</script>