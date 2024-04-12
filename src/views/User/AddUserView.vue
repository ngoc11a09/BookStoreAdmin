<template>
    <a-typography-title :style="{ textAlign: 'Left' }">Add user:</a-typography-title>

    <user-form @submit="onSubmit" />

</template>

<script setup lang="ts">
import { create } from '@/api/user.api';
import UserForm from '@/components/UserForm.vue'

const onSubmit = async (data: any) => {
    try {
        await create(data)
        alert("Add a new user successfully")
    } catch (error: any) {
        alert(error.message)
    }
}

</script>