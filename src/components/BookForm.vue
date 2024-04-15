<template>
    <a-form :rules="rules" ref="formRef" @submit.prevent="handleSubmit" :model="formState" name="addbook"
        :label-col="labelCol" :wrapper-col="wrapperCol" layout="horizontal" style="max-width: 1000px"
        :style="{ margin: '0 auto' }">
        <a-form-item label="Title" name="title">
            <a-input v-model:value="formState.title" />
        </a-form-item>
        <a-form-item label="Code" name="code">
            <a-input v-model:value="formState.code" />
        </a-form-item>
        <a-form-item label="Price" name="price">
            <a-input-number v-model:value="formState.price" prefix="VND" style="width: 100%" />
        </a-form-item>
        <a-form-item label="Quantity" name="quantity">
            <a-input-number v-model:value="formState.quantity" :keyboard="true" />
        </a-form-item>
        <a-form-item label="Year of publication" name="publishYear">
            <a-input-number v-model:value="formState.publishYear" :keyboard="true" />
        </a-form-item>
        <a-form-item label="Publisher" name="publishCode">
            <a-select v-model:value="formState.publishCode">
                <a-select-option v-for="item in publishers" :key="item.code" :value="item.code">{{
                    item.name
                }}</a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item label="Author" name="author">
            <a-input v-model:value="formState.author" />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 5, span: 14 }" :style="{ width: '100%' }">
            <a-flex vertical gap="small" class="center-btn">
                <a-button class=" btn-full submit-btn" block :style="{ backgroundColor: '#27ae60', color: 'white' }"
                    html-type="submit" type="text">Send</a-button>
                <a-button class=" btn-full submit-btn" block @click="resetForm">Reset</a-button>
            </a-flex>
        </a-form-item>
    </a-form>
</template>
<script setup lang="ts">
import { computed, onBeforeMount, onMounted, reactive, ref } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';
import { getOne } from '@/api/book.api';
import { getAllPublishers } from '@/api/publisher';
import type { IPublisher } from '@/interfaces/publisher.interface';
import type { IBook } from '@/interfaces/book.interface';

const emit = defineEmits(['submit'])
const props = defineProps({
    _id: String,
})

const formRef = ref()
const labelCol = { span: 5 };
const wrapperCol = { span: 14 };
const formState = reactive<IBook>({
    code: '',
    title: '',
    price: null,
    quantity: null,
    publishYear: null,
    publishCode: '',
    author: '',
})
const checkNum = async (_rule: Rule, value: number) => {
    if (!value) {
        return Promise.reject('This field is required');
    }
    if (!Number.isInteger(value)) {
        return Promise.reject('Please input digits');
    } else {
        if (value < 0) {
            return Promise.reject('Number must be greater than 0');
        } else {
            return Promise.resolve();
        }
    }
};
const rules: Record<string, Rule[]> = {
    title:
        [
            { required: true, message: 'Please input book\'s title!' },
            { min: 4, max: 30, message: 'Length should be 4 to 30' }
        ],
    code:
        [
            { required: true, message: 'Please input book\'s code!' },
            { min: 4, max: 8, message: 'Length should be 4 to 8' },
        ],
    price:
        [
            { validator: checkNum }
        ],
    quantity:
        [
            { validator: checkNum }
        ],
    publishYear:
        [
            { validator: checkNum }

        ],
    publishCode:
        [
            { required: true, message: 'Please choose publisher!' },
        ],
    author:
        [
            { required: true, message: 'Please input author\'s name!' }
        ],
}


const editMode = computed(() => {
    return props._id !== undefined
})
let publishers = ref<IPublisher[]>()
let book = ref<IBook>({} as IBook)

onBeforeMount(async () => {
    try {
        const res = (await getAllPublishers())
        publishers.value = res;

    } catch (error) {
        alert('Cannot get publishers. Please try again')
    }
})

onMounted(async () => {
    if (editMode.value) {
        try {
            const res = (await getOne(props._id as string)).book
            book.value = res;
            formState.title = book.value.title
            formState.code = book.value.code
            formState.price = book.value.price
            formState.quantity = book.value.quantity
            formState.publishCode = book.value.publishCode
            formState.publishYear = book.value.publishYear
            formState.author = book.value.author
        } catch (error) {
            alert('Cannot get book\'s information')
        }
    }
})

const resetForm = () => {
    if (editMode.value) {
        formState.title = book.value.title
        formState.code = book.value.code
        formState.price = book.value.price
        formState.quantity = book.value.quantity
        formState.publishCode = book.value.publishCode
        formState.publishYear = book.value.publishYear
        formState.author = book.value.author
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
        formRef.value.resetFields()
    }
}
</script>