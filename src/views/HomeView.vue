<template>
  <a-layout>
    <a-button @click="handleSignOut" type="primary" class="signout-btn">Sign out</a-button>
    <header-component />
    <a-layout :style="{ margin: '64px 0 0 0' }">
      <slider-component />
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content :style="{ background: '#fff', padding: '24px', margin: '0 0 0 200px' }">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
    <a-layout-footer style="text-align: center">
      BookStore ©2024 Created by Khuu Thi Bich Ngoc B2203514
    </a-layout-footer>
  </a-layout>
</template>


<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue';
import SliderComponent from '@/components/SliderComponent.vue';
import { useAuthStore } from '@/stores/auth.store';
const handleSignOut = () => {
  try {
    const authStore = useAuthStore()
    authStore.signOut()
  } catch (error) {
    alert('Fail to sign out')
  }
}
</script>
<style>
.signout-btn {
  position: absolute;
  z-index: 10;
  height: 64px;
  padding: 20px;
  box-sizing: border-box;
  right: 0;
  border-radius: 0;
  background-color: rgba(255, 255, 255, 0) !important;
  /* background-color: #D33A2C; */
}

.signout-btn:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}
</style>