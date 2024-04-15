<template>
    <a-form :rules="rules" ref="formRef" @submit.prevent="handleSubmit" :model="formState" name="addborrow"
        :label-col="labelCol" :wrapper-col="wrapperCol" layout="horizontal" style="max-width: 1000px"
        :style="{ margin: '0 auto' }">
        <a-form-item label="Code" name="code">
            <a-input v-model:value="formState.code" />
        </a-form-item>
        <a-form-item label="Borrower" name="userCode">
            <a-select v-model:value="formState.userCode">
                <a-select-option v-for="item in users" :key="item.uId" :value="item.uId">{{
                    item.username
                }}</a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item label="Book title" name="bookCode">
            <a-select v-model:value="formState.bookCode">
                <a-select-option v-for="item in books" :key="item.code" :value="item.code">{{
                    item.title
                    }}</a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item label="Borrow date" name="borrowedDate">
            <a-date-picker :valueFormat="'YYYY-MM-DDTHH:mm:ssZ'" :format="'DD/MM/YYYY'"
                v-model:value="formState.borrowedDate" />
        </a-form-item>
        <a-form-item label="Return Date" name="returnDate">
            <a-date-picker :valueFormat="'YYYY-MM-DDTHH:mm:ssZ'" :format="'DD/MM/YYYY'"
                v-model:value="formState.returnDate" />
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
<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';
import { getOne, type IBorrowRes } from '@/api/borrow.api';
import { getAllUsers, type IUserRes } from '@/api/user.api';
import { getAllBooks, type IBookRes } from '@/api/book.api';

const emit = defineEmits(['submit'])
const props = defineProps({
    _id: String,
})
const formRef = ref()
const labelCol = { span: 4 };
const wrapperCol = { span: 14 };
const formState = reactive<IBorrowRes>({
    code: '',
    userCode: '',
    bookCode: '',
    returnDate: null,
    borrowedDate: null,
})

const checkReturnDate = async (_rule: Rule, value: Date) => {
    if (!value) {
        return Promise.reject('This field is required');
    }
    if (value < formState.borrowedDate!) {
        return Promise.reject('Return date must be equal or later than borrowed date');
    } else {
        return Promise.resolve();
    }
};

const rules: Record<string, Rule[]> = {
    code:
        [
            { required: true, message: 'Code is required!' },
            { min: 4, max: 25, message: 'Length should be 4 to 25' }
        ],
    userCode:
        [
            { required: true, message: 'Please choose borrower\'s username!' },
        ],
    bookCode:
        [
            { required: true, message: 'Please choose book\'s title!' },
        ],
    borrowedDate:
        [
            { required: true, message: 'Please choose borrow date!' },
        ],
    returnDate:
        [
            { validator: checkReturnDate },
        ],
}

const editMode = computed(() => {
    return props._id !== undefined
})
let users = ref<IUserRes[]>()
let books = ref<IBookRes[]>()
let borrow: any
onMounted(async () => {

    try {
        books.value = await getAllBooks()
        users.value = await getAllUsers()

    } catch (error) {
        alert('Fail to get data. Please try again!')
    }

    if (editMode.value) {
        try {
            borrow = (await getOne(props._id as string))
            formState.code = borrow.code
            formState.userCode = borrow.userCode
            formState.bookCode = borrow.bookCode
            formState.borrowedDate = borrow.borrowedDate
            formState.returnDate = borrow.returnDate
        } catch (error) {
            alert('Cannot get borrow\'s information')
        }
    }
})

const resetForm = () => {
    if (editMode.value) {
        formState.code = borrow.code
        formState.userCode = borrow.userCode
        formState.bookCode = borrow.bookCode
        formState.borrowedDate = borrow.borrowedDate
        formState.returnDate = borrow.returnDate
    } else formRef.value.resetFields();
};

const handleSubmit = async () => {
    const res = await formRef.value
        .validate()
        .then(() => {
            console.log('Validate successfully');
        })
        .catch((error: any) => {
            return error.errorFields.length
        });
    if (res === 0) {
        emit('submit', formState)
    }
}
</script>