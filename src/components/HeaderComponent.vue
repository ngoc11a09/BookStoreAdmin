<template>
    <!-- :style="{ position: 'fixed', zIndex: 1, width: '100%' }" -->
    <a-layout-header class="header">
        <div class="logo"></div>
        <a-menu v-model:selectedKeys="selectedKeys1" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
            <a-menu-item key="1"> nav 1</a-menu-item>
            <a-menu-item key="2">nav 2</a-menu-item>
            <a-menu-item key="3">nav 3</a-menu-item>
        </a-menu>
    </a-layout-header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedKeys1 = ref<string[]>(['1']);
</script>

<style scoped>
#components-layout-demo-top-side-2 .logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
    float: right;
    margin: 16px 0 16px 24px;
}

.site-layout-background {
    background: #fff;
}
</style>