<template>
    <a-layout-sider width="200" style="background: #fff"
        :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: '64px', bottom: 0 }">
        <a-menu v-model:selectedKeys="selectedKeys2" v-model:openKeys="openKeys" mode="inline"
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
                    <router-link :to="{ name: 'user-add' }"> </router-link>
                    <span>Add new user</span>
                </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
                <template #title>
                    <span>
                        <BookOutlined />
                        Book
                    </span>
                </template>
                <a-menu-item key="5">
                    <router-link :to="{ name: 'book' }"> </router-link>
                    <span>View books list</span>
                </a-menu-item>
                <a-menu-item key="6">
                    <router-link :to="{ name: 'book-add' }"> </router-link>
                    <span>Add new book</span>
                </a-menu-item>
            </a-sub-menu>
            <!-- <a-sub-menu key="sub3">
                <template #title>
                    <span>
                        <notification-outlined />
                        subnav 3
                    </span>
                </template>
                <a-menu-item key="9">option9</a-menu-item>
                <a-menu-item key="10">option10</a-menu-item>
                <a-menu-item key="11">option11</a-menu-item>
                <a-menu-item key="12">option12</a-menu-item>
            </a-sub-menu> -->
        </a-menu>
    </a-layout-sider>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { TeamOutlined, BookOutlined } from '@ant-design/icons-vue';

const selectedKeys2 = ref<string[]>([]);
const openKeys = ref<string[]>([]);
</script>
