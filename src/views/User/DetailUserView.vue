<template>
    <a-typography-title :style="{ textAlign: 'Left' }">User's Information:</a-typography-title>

    <user-form :_id :data @submit="handleSubmit" />

</template>

<script setup lang="ts">
import { updateOne, type IGetOneUserRes } from '@/api/user.api';
import UserForm from '@/components/UserForm.vue';
import type { IUserInfo } from '@/interfaces/user.interface';
import router from '@/router';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const data = ref<IGetOneUserRes>()

const _id = route.params.id as string

const handleSubmit = async (data: IUserInfo) => {
    try {
        await updateOne(_id as string, data)
        alert("Update user successfully")
        router.push('/users')
    } catch (error: any) {
        alert(error.message)
    }
}

// onMounted(async () => {
//     try {
//         const user = (await getOne(_id)).user
        
//     } catch (error) {
//         console.log(error)
//     }
// })
</script>