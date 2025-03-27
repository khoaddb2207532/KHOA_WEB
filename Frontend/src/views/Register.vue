<template>
    <div>
        <h1>Đăng ký tài khoản</h1>
        <b-form @submit.prevent="register">
            <b-form-group label="Họ và tên">
                <b-form-input v-model="name" required></b-form-input>
            </b-form-group>
            <b-form-group label="Email">
                <b-form-input type="email" v-model="email" required></b-form-input>
            </b-form-group>
            <b-form-group label="Mật khẩu">
                <b-form-input type="password" v-model="password" required></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Đăng ký</b-button>
        </b-form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import ReaderService from "@/api/ReaderService";

const name = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();

const register = async () => {
    try {
        await ReaderService.register({ name: name.value, email: email.value, password: password.value });
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        router.push("/login");
    } catch (error) {
        console.error("Lỗi khi đăng ký:", error);
        alert("Đăng ký thất bại. Vui lòng thử lại.");
    }
};
</script>