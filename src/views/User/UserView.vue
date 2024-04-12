<template>
    <a-typography-title>Manage user:</a-typography-title>
    <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">Add user</a-button>
    <a-table :columns="columns" :data-source="data" bordered :pagination="false" :customRow="(record: IUserRes, index: any) => {
        return {
            onClick: () => {
                router.push(`users/${record._id}`)
            }
        }
    }">
    </a-table>
</template>
<script lang="ts" setup>
import { getAllUsers, type IUserRes } from '@/api/user.api';
import router from '@/router';
import { onMounted, ref } from 'vue';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '20%'
    },
    {
        title: 'Lastname',
        dataIndex: 'lastName',
        key: 'lastName',
        width: '20%'
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        width: '20%'
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: '30%'
    },
];

const data = ref<IUserRes[]>([])

const handleAdd = () => {
    router.push('/users/add')
}

onMounted(async () => {
    try {
        const res = await getAllUsers()
        data.value = res
    } catch (error) {
        alert('Cannot get all users')
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