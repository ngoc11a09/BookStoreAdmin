<template>
    <a-typography-title :style="{ textAlign: 'Left' }">Borrow's Information:</a-typography-title>
    <a-button @click="handleDeleteUser" :wrapper-col="{ offset: 14, span: 2 }" type="primary" danger
        :style="{ margin: '0 0 20px 0' }">
        <DeleteOutlined />
        <span>
            Delete
        </span>
    </a-button>
    <borrow-form :_id :data @submit="handleSubmit" />

</template>

<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { DeleteOutlined } from '@ant-design/icons-vue'
import { deleteOne, updateOne, type IBorrowRes } from '@/api/borrow.api';
import BorrowForm from '@/components/BorrowForm.vue';

const route = useRoute()

const data = ref<IBorrowRes>()

const _id = route.params.id as string

const handleDeleteUser = async () => {
    try {
        await deleteOne(_id)
        alert('Delete borrow successfully')
        router.push('/borrows')
    } catch (error: any) {
        alert(error.message)
    }
}

const handleSubmit = async (data: IBorrowRes) => {
    try {
        await updateOne(_id as string, data)
        alert("Update borrow successfully")
        router.push('/borrows')
    } catch (error: any) {
        alert(error.message)
    }
}
</script>