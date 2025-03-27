<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/authStore";

const email = ref("");
const password = ref("");
const isAdmin = ref(false);
const router = useRouter();
const authStore = useAuthStore();

const login = async () => {
    const success = await authStore.login(
        { Email: email.value, Password: password.value },
        isAdmin.value
    );

    if (success) {
        const role = authStore.role;
        console.log(role); // Lấy role từ token đã giải mã
        if (role === "Quản Lý") {
            router.push("/admin");
        } else if (role === "Nhân Viên") {
            router.push("/employee");
        } else if (role === "reader") {
            router.push("/reader");
        } else {
            alert("Không xác định được quyền truy cập!");
        }
    } else {
        alert("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.");
    }
};
</script>

<template>
    <b-container class="mt-5">
        <b-row class="justify-content-center">
            <b-col md="6">
                <b-card title="Đăng nhập">
                    <b-form @submit.prevent="login">
                        <b-form-group label="Email">
                            <b-form-input v-model="email" type="email" required></b-form-input>
                        </b-form-group>

                        <b-form-group label="Mật khẩu">
                            <b-form-input v-model="password" type="password" required></b-form-input>
                        </b-form-group>

                        <b-form-group>
                            <b-form-checkbox v-model="isAdmin">Đăng nhập với quyền Admin</b-form-checkbox>
                        </b-form-group>

                        <b-button type="submit" variant="primary" block>Đăng nhập</b-button>
                    </b-form>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>
