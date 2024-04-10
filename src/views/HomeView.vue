<!-- <template>
  <div>
    <button @click="handleSignOut">sign out</button>
  </div>
</template> -->

<template>
  <a-layout>
    <header-component />
    <a-layout :style="{ margin: '64px 0 0 0' }">
      <slider-component />
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content :style="{ background: '#fff', padding: '24px', minHeight: '280px', margin: '0 0 0 200px' }">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>


<script setup lang="ts">
// import { useAuthStore } from '@/stores/auth.store';
import HeaderComponent from '@/components/HeaderComponent.vue';
import SliderComponent from '@/components/SliderComponent.vue';


// const handleSignOut = () => {
//   try {
//     const authStore = useAuthStore()
//     authStore.signOut()
//   } catch (error) {
//     alert('Fail to sign out')
//   }
// }
</script>