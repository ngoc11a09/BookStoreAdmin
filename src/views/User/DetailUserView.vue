<template>
    <a-typography-title :style="{ textAlign: 'Left' }">User's Information:</a-typography-title>
    <a-button @click="handleDeleteUser" :wrapper-col="{ offset: 14, span: 2 }" type="primary" danger
        :style="{ margin: '0 0 20px 0' }">
        <DeleteOutlined />
        <span>
            Delete
        </span>
    </a-button>
    <user-form :_id :data @submit="handleSubmit" />

</template>

<script setup lang="ts">
import { deleteOne, updateOne, type IGetOneUserRes } from '@/api/user.api';
import UserForm from '@/components/UserForm.vue';
import type { IUserInfo } from '@/interfaces/user.interface';
import router from '@/router';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { DeleteOutlined } from '@ant-design/icons-vue'

const route = useRoute()

const data = ref<IGetOneUserRes>()

const _id = route.params.id as string

const handleDeleteUser = async () => {
    try {
        await deleteOne(_id)
        alert('Delete user successfully')
        router.push('/users')
    } catch (error: any) {
        alert(error.message)
    }
}

const handleSubmit = async (data: IUserInfo) => {
    try {
        await updateOne(_id as string, data)
        alert("Update user successfully")
        router.push('/users')
    } catch (error: any) {
        alert(error.message)
    }
}
</script>