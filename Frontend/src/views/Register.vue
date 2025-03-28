<template>
    <div>
        <h1>Đăng ký tài khoản</h1>
        <b-form @submit.prevent="register">
            <b-form-group label="Họ Lót">
                <b-form-input v-model="HOLOT" required></b-form-input>
            </b-form-group>
            <b-form-group label="Tên">
                <b-form-input v-model="TEN" required></b-form-input>
            </b-form-group>
            <b-form-group label="Ngày Sinh">
                <b-form-input type="date" v-model="NGAYSINH" required></b-form-input>
            </b-form-group>
            <b-form-group label="Giới Tính">
                <b-form-select v-model="PHAI" :options="genders" required></b-form-select>
            </b-form-group>
            <b-form-group label="Địa chỉ">
                <b-form-input v-model="DIACHI" required></b-form-input>
            </b-form-group>
            <b-form-group label="Số Điện Thoại">
                <b-form-input type="tel" v-model="DIENTHOAI" required></b-form-input>
            </b-form-group>
            <b-form-group label="Email">
                <b-form-input type="email" v-model="Email" required></b-form-input>
            </b-form-group>
            <b-form-group label="Mật khẩu">
                <b-form-input type="password" v-model="Password" required></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Đăng ký</b-button>
        </b-form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import ReaderService from "@/api/ReaderService";

const HOLOT = ref("");
const TEN = ref("");
const NGAYSINH = ref("");
const PHAI = ref("");
const DIACHI = ref("");
const DIENTHOAI = ref("");
const Email = ref("");
const Password = ref("");
const genders = [
    { value: "Nam", text: "Nam" },
    { value: "Nữ", text: "Nữ" },
    { value: "Khác", text: "Khác" }
];
const router = useRouter();

const register = async () => {
    try {
        await ReaderService.register({
            HOLOT: HOLOT.value,
            TEN: TEN.value,
            NGAYSINH: NGAYSINH.value,
            PHAI: PHAI.value,
            DIACHI: DIACHI.value,
            DIENTHOAI: DIENTHOAI.value,
            Email: Email.value,
            Password: Password.value
        });
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        router.push("/login");
    } catch (error) {
        console.error("Lỗi khi đăng ký:", error);
        alert("Đăng ký thất bại. Vui lòng thử lại.");
    }
};
</script>