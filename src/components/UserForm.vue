<template>
    <a-typography-title :style="{ textAlign: 'Left' }">Add user:</a-typography-title>
    <a-form ref="formRef" @submit.prevent="handleSubmit" :model="formState" name="adduser" :label-col="labelCol"
        :wrapper-col="wrapperCol" layout="horizontal" style="max-width: 1000px" :style="{ margin: '0 auto' }">

        <a-form-item label="Username" name="username"
            :rules="[{ required: true, message: 'Please input user\'s username!' }, { min: 4, max: 25, message: 'Length should be 4 to 25', trigger: 'blur' },]">
            <a-input v-model:value="formState.username" />
        </a-form-item>
        <a-form-item label="Password" name="password"
            :rules="[{ required: true, message: 'Please input user\'s password!' }, { min: 8, max: 25, message: 'Length should be 8 to 25', trigger: 'blur' },]">
            <a-input-password v-model:value="formState.password" />
        </a-form-item>
        <a-form-item label="Email" name="email"
            :rules="[{ required: true, message: 'Please input user\'s email!' }, { type: 'email', message: 'Invalid email!', trigger: 'blur' },]">
            <a-input v-model:value="formState.email" />
        </a-form-item>
        <a-form-item label="Name" name="name"
            :rules="[{ required: true, message: 'Please input user\'s name!' }, { min: 0, max: 25, message: 'Length should be 0 to 25', trigger: 'blur' },]">
            <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="Lastname" name="lastName"
            :rules="[{ required: true, message: 'Please input user\'s last name!' }, { min: 4, max: 30, message: 'Length should be 4 to 25', trigger: 'blur' },]">
            <a-input v-model:value="formState.lastName" />
        </a-form-item>
        <a-form-item label="Phone number" name="phone"
            :rules="[{ required: true, message: 'Please input user\'s phone number!' }, { len: 10, message: 'Phone number must be 10 digits', trigger: 'blur' },]">
            <a-input v-model:value="formState.phone" />
        </a-form-item>
        <a-form-item label="Gender">
            <a-radio-group v-model:value="formState.gender">
                <a-radio value="0">Male</a-radio>
                <a-radio value="1">Female</a-radio>
                <a-radio value="unknow">Unknow</a-radio>
            </a-radio-group>
        </a-form-item>
        <a-form-item label="Address" name="address"
            :rules="[{ required: true, message: 'Please input user\'s address!' }]">
            <a-cascader :options="options" v-model:value="formState.address" />
        </a-form-item>
        <a-form-item label="Birthday" name="birthday"
            :rules="[{ required: true, message: 'Please input user\'s birthday!' }]">
            <a-date-picker :format="['DD/MM/YYYY']" v-model:value="formState.birthday" :disabled-date="disabledDate" />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 4, span: 14 }" :style="{ width: '100%' }">
            <a-flex vertical gap="small" class="center-btn">
                <a-button class=" btn-full submit-btn" block :style="{ backgroundColor: '#27ae60', color: 'white' }"
                    html-type="submit" type="text">Send</a-button>
                <a-button class=" btn-full submit-btn" block @click="resetForm">Reset</a-button>
            </a-flex>
        </a-form-item>
    </a-form>
</template>
<script lang="ts" setup>
import { ref, reactive, toRaw } from 'vue';
import type { CascaderProps } from 'ant-design-vue';
import type { IUserCreate } from '@/interfaces/user.interface';
import { create } from '@/api/user.api';
import dayjs, { Dayjs } from 'dayjs';

const formRef = ref()
const disabledDate = (current: Dayjs) => {
    return current && current > dayjs().endOf('day');
};

const labelCol = { span: 4 };
const wrapperCol = { span: 14 };
const formState = reactive<IUserCreate>({
    name: '',
    lastName: '',
    phone: '',
    gender: 'unknow',
    address: [],
    birthday: null,
    username: '',
    password: '',
    email: ''
})
const options: CascaderProps['options'] = ([
    {
        value: 'cantho',
        label: 'Can Tho',
        children: [
            {
                value: 'ninhkieu',
                label: 'Ninh Kieu',
            }, {
                value: 'ankhanh',
                label: 'An Khanh',
            },
            {
                value: 'cairang',
                label: 'Cai Rang',
            },
            {
                value: 'xuankhanh',
                label: 'Xuan Khanh',
            },
        ]
    },
    {
        value: 'tphcm',
        label: 'Thanh pho Ho Chi Minh',
        children: [
            {
                value: 'quan1',
                label: 'Quan 1',
            }, {
                value: 'quan2',
                label: 'Quan 2',
            },
            {
                value: 'quan3',
                label: 'Quan 3',
            },
            {
                value: 'quanthuduc',
                label: 'Quan Thu Duc',
            },
        ],
    }
]);

const handleSubmit = async () => {
    try {
        await create(formState)
        alert("Add a new user successfully")
    } catch (error) {
        alert("Failed to add new user")
    }
}

const resetForm = () => {
    formRef.value.resetFields();
};

</script>