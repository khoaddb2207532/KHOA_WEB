<template>
    <b-navbar toggleable="lg" type="dark" variant="primary">
        <b-navbar-brand href="/">📚 Quản lý Thư viện</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <!-- Menu cho Admin -->
                <template v-if="authStore.role === 'Quản Lý'">
                    <b-nav-item to="/admin/book-management">Quản lý Sách</b-nav-item>
                    <b-nav-item to="/admin/publisher-management">Quản lý Nhà xuất bản</b-nav-item>
                    <b-nav-item to="/admin/employee-management">Quản lý Nhân viên</b-nav-item>
                    <b-nav-item to="/admin/reader-management">Quản lý Độc giả</b-nav-item>
                    <b-nav-item to="/admin/borrowing-management">Quản lý Mượn sách</b-nav-item>
                </template>

                <!-- Menu cho Nhân viên -->
                <template v-if="authStore.role === 'Nhân Viên'">
                    <b-nav-item to="/admin/book-management">Quản lý Sách</b-nav-item>
                    <b-nav-item to="/admin/publisher-management">Quản lý Nhà xuất bản</b-nav-item>
                    <b-nav-item to="/admin/borrowing-management">Quản lý Mượn sách</b-nav-item>
                    <b-nav-item to="/books">Tìm kiếm Sách</b-nav-item>
                    <b-nav-item to="/employee/profile">Thông tin Nhân Viên</b-nav-item>
                </template>

                <!-- Menu cho Độc giả -->
                <template v-if="authStore.role === 'reader'">
                    <b-nav-item to="/reader/borrowings">Sách đang mượn</b-nav-item>

                    <b-nav-item to="/reader/profile">Thông tin Độc giả</b-nav-item>
                </template>

                <!-- Menu cho Khách vãng lai -->
                <template v-if="!authStore.token">
                    <b-nav-item to="/">Danh sách Sách</b-nav-item>
                    <b-nav-item to="/register">Đăng ký</b-nav-item>
                </template>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <!-- Hiển thị thông tin người dùng -->
                <div v-if="authStore.token" class="d-flex align-items-center">
                    <b-dropdown id="user-dropdown" :text="'Hi, ' + authStore.userName" variant="success" right>
                        <b-dropdown-item @click="logout">Đăng xuất</b-dropdown-item>
                    </b-dropdown>
                </div>
                <b-nav-item v-else to="/login">Đăng nhập</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script setup>
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "vue-router";
import { ref } from "vue";

const authStore = useAuthStore();
const router = useRouter();
const showLogout = ref(false); // Trạng thái hiển thị nút Đăng xuất

const logout = () => {
    authStore.logout();
    router.push("/login");
};
</script>
