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

<template>
    <b-navbar toggleable="lg" type="dark" variant="primary">
        <b-navbar-brand href="/">📚 Quản lý Thư viện</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item v-if="authStore.role === 'reader'" to="/books">Sách</b-nav-item>
                <b-nav-item v-if="authStore.role === 'Quản Lý' || authStore.role === 'Nhân Viên'"
                    to="/book-management">Quản lý Sách</b-nav-item>
                <b-nav-item v-if="authStore.role === 'Quản Lý' || authStore.role === 'Nhân Viên'"
                    to="/publisher-management">Quản lý Nhà xuất bản</b-nav-item>
                <b-nav-item v-if="authStore.role === 'Quản Lý'" to="/employee-management">Quản lý Nhân viên</b-nav-item>
                <b-nav-item v-if="authStore.role === 'Quản Lý' || authStore.role === 'Nhân Viên'"
                    to="/reader-management">Quản lý Độc giả</b-nav-item>
                <b-nav-item v-if="authStore.role === 'Quản Lý' || authStore.role === 'Nhân Viên'"
                    to="/borrowing-management">Quản lý Mượn sách</b-nav-item>
                <b-nav-item v-if="authStore.role === 'reader'" to="/reader">Tài khoản</b-nav-item>
                <b-nav-item v-if="authStore.role === 'reader'" to="/borrowings">Sách đã mượn</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <div v-if="authStore.token" class="d-flex align-items-center">
                    <!-- Hiển thị tên người dùng hoặc vai trò -->
                    <b-dropdown  id="user-dropdown" :text="'Hi, ' + authStore.userName" variant="success" right>
                        <b-dropdown-item @click="logout">Đăng xuất</b-dropdown-item>
                    </b-dropdown>
                </div> <b-nav-item v-else to="/login">Đăng nhập</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>
