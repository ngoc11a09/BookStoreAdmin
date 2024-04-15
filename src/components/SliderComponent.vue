<template>
    <a-layout-sider width="200" style="background: #fff"
        :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: '64px', bottom: 0 }">
        <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" mode="inline"
            :style="{ height: '100%', borderRight: 0 }">
            <a-sub-menu key="user">
                <template #title>
                    <span>
                        <team-outlined />
                        User
                    </span>
                </template>
                <a-menu-item key="1">
                    <router-link :to="{ name: 'user' }"> </router-link>
                    <span>View users list</span>
                </a-menu-item>
                <a-menu-item key="2">
                    <router-link :to="{ name: 'user:add' }"> </router-link>
                    <span>Add new user</span>
                </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="book">
                <template #title>
                    <span>
                        <BookOutlined />
                        Book
                    </span>
                </template>
                <a-menu-item key="3">
                    <router-link :to="{ name: 'book' }"> </router-link>
                    <span>View books list</span>
                </a-menu-item>
                <a-menu-item key="4">
                    <router-link :to="{ name: 'book:add' }"> </router-link>
                    <span>Add new book</span>
                </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="borrow">
                <template #title>
                    <span>
                        <SolutionOutlined />
                        Borrow
                    </span>
                </template>
                <a-menu-item key="5">
                    <router-link :to="{ name: 'borrow' }"> </router-link>
                    <span>View borrows list</span>
                </a-menu-item>
                <a-menu-item key="6">
                    <router-link :to="{ name: 'borrow:add' }"> </router-link>
                    <span>Add new borrow</span>
                </a-menu-item>
            </a-sub-menu>
        </a-menu>
    </a-layout-sider>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { TeamOutlined, BookOutlined, SolutionOutlined } from '@ant-design/icons-vue';

const selectedKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);

</script>
