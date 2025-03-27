<script setup>
import { useAuthStore } from "@/store/authStore";
import BookList from "@/views/BookList.vue";
const authStore = useAuthStore();
</script>

<template>
    <b-container class="mt-5 text-center">
        <h1>📚 Hệ thống Quản lý Thư viện</h1>
        <p>Chào mừng bạn đến với hệ thống quản lý thư viện trực tuyến.</p>

        <b-row class="justify-content-center">
            <b-col md="6">
                <!-- <b-button v-if="!authStore.token" to="/login" variant="primary" size="lg">Đăng nhập</b-button> -->
                <b-button v-if="authStore.role === 'admin'" to="/admin" variant="success" size="lg">Trang
                    Admin</b-button>
                <b-button v-if="authStore.role === 'reader'" to="/reader" variant="info" size="lg">Trang cá
                    nhân</b-button>
            </b-col>
        </b-row>
    
        <BookList />
    </b-container>
</template>
