<template>
    <a-card>
        <a-typography-title :style="{ textAlign: 'center' }">Sign In</a-typography-title>
        <a-flex justify="center" alignItems="center">
            <a-form :model="formState" class="signin-form" name="signin" autocomplete="off" @submit="handleSubmit">
                <a-form-item name="username"
                    :rules="[{ required: true, message: 'Please input your username!' }, { min: 4, max: 25, message: 'Length should be 4 to 25', trigger: 'blur' },]">
                    <a-typography-text>Username:</a-typography-text>
                    <a-input v-model:value="formState.username">
                        <template #prefix>
                            <UserOutlined class="site-form-item-icon" />
                        </template>
                    </a-input>
                </a-form-item>

                <a-form-item name="password"
                    :rules="[{ required: true, message: 'Please input your password!' }, { min: 8, max: 25, message: 'Length should be 8 to 25', trigger: 'blur' },]">
                    <a-typography-text>Password:</a-typography-text>
                    <a-input-password v-model:value="formState.password">
                        <template #prefix>
                            <LockOutlined class="site-form-item-icon" />
                        </template>
                    </a-input-password>
                </a-form-item>

                <a-form-item>
                    <a-flex vertical class="center-btn">
                        <a-button class="btn-full submit-btn" block
                            :style="{ backgroundColor: '#27ae60', color: 'white' }" html-type="submit" type="text">Sign
                            in</a-button>
                    </a-flex>
                </a-form-item>
            </a-form>
        </a-flex>
    </a-card>

</template>

<script setup lang="ts">
import type { ISignInData } from '@/interfaces/auth.interface';
import { useAuthStore } from '@/stores/auth.store';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { reactive } from 'vue';

const formState = reactive<ISignInData>({
    username: "user",
    password: "12345678"
})

const handleSubmit = async () => {
    try {
        const authStore = useAuthStore()
        const res = await authStore.signIn(formState)
        alert(res)
    } catch (error: any) {
        //console.log(error);
        alert(error.message)
        formState.username = ""
        formState.password = ""
    }
}

</script>

<style>
.signin-form {
    width: 25%;
}

.center-btn {
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn-full {
    width: 100%;
}

.submit-btn:hover {
    opacity: 0.8;
}

.cancle-btn:hover {
    background-color: #FFE7E7 !important;
    color: #D33A2C !important;
}
</style>