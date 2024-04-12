<template>
    <a-result status="403" title="403" sub-title="Sorry, you are not authorized to access this page.">
        <template #extra>
            <a-button @click="$router.push('/signin')" type="primary">Back to Signin</a-button>
        </template>
    </a-result>
</template>