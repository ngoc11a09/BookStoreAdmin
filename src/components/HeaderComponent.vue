<template>
    <a-layout-header class="header"
        :style="{ backgroundColor: '#11252b', position: 'fixed', zIndex: 1, width: '100%' }">
        <a-typography-text strong :style="{ lineHeight: '64px', color: 'white', borderRight: 'solid 1px gray' }"
            class="title">
            ADMIN PAGE
        </a-typography-text>
        <a-menu v-model:selectedKeys="selectedKeys1" mode="horizontal" theme="dark"
            :style="{ lineHeight: '64px', backgroundColor: '#11252b', color: 'white', width: '100%' }">
            <a-menu-item key="1">Home</a-menu-item>
            <a-menu-item key="2">Account</a-menu-item>
        </a-menu>
    </a-layout-header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedKeys1 = ref<string[]>(['1']);


</script>

<style scoped>
.header {
    display: flex;
    flex-direction: row;
    width: '10%';
}

.title {
    display: inline-block;
    width: 134px;
}

.ant-menu-horizontal .ant-menu-submenu.ant-menu-submenu-inline {
    width: 1000px;
}

.site-layout-background {
    background: #fff;
}
</style>