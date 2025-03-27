<script setup>
import { ref, onMounted } from "vue";
import ReaderService from "@/api/ReaderService";
import { useAuthStore } from "@/store/authStore";

const authStore = useAuthStore();
const readerInfo = ref({}); // Lưu thông tin độc giả
const oldPassword = ref(""); // Lưu mật khẩu cũ
const newPassword = ref(""); // Lưu mật khẩu mới
const confirmPassword = ref(""); // Xác nhận mật khẩu mới
const isEditing = ref(false); // Trạng thái chỉnh sửa thông tin
const isResettingPassword = ref(false); // Trạng thái đặt lại mật khẩu

const fetchReaderInfo = async () => {
    try {
        // Giải mã token để lấy MADOCGIA
        const decodedToken = JSON.parse(atob(authStore.token.split(".")[1])); // Giải mã token
        const madocgia = decodedToken.MADOCGIA; // Lấy MADOCGIA từ token

        // Gọi API để lấy thông tin độc giả
        readerInfo.value = await ReaderService.getInfo(madocgia);
    } catch (error) {
        console.error("Lỗi khi lấy thông tin độc giả:", error);
    }
};

const updateReaderInfo = async () => {
    try {
        await ReaderService.updateInfo(readerInfo.value.MADOCGIA, readerInfo.value);
        alert("Cập nhật thông tin thành công!");
        isEditing.value = false; // Thoát chế độ chỉnh sửa
    } catch (error) {
        console.error("Lỗi khi cập nhật thông tin:", error);
        alert("Cập nhật thông tin thất bại!");
    }
};

const updatePassword = async () => {
    if (!oldPassword.value) {
        alert("Vui lòng nhập mật khẩu cũ!");
        return;
    }

    if (newPassword.value !== confirmPassword.value) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
    }

    try {
        await ReaderService.updatePassword(readerInfo.value.MADOCGIA, oldPassword.value, newPassword.value);
        alert("Đặt lại mật khẩu thành công!");
        oldPassword.value = "";
        newPassword.value = "";
        confirmPassword.value = "";
        isResettingPassword.value = false; // Ẩn form đặt lại mật khẩu
    } catch (error) {
        console.error("Lỗi khi đặt lại mật khẩu:", error);
        alert("Đặt lại mật khẩu thất bại!");
    }
};

onMounted(fetchReaderInfo); // Gọi hàm khi component được mount
</script>

<template>
    <b-container>
        <h2>Thông tin cá nhân</h2>
        <b-form @submit.prevent="updateReaderInfo">
            <b-form-group label="Mã độc giả">
                <b-form-input v-model="readerInfo.MADOCGIA" disabled></b-form-input>
            </b-form-group>
            <b-form-group label="Họ lót">
                <b-form-input v-model="readerInfo.HOLOT" :disabled="!isEditing"></b-form-input>
            </b-form-group>
            <b-form-group label="Tên">
                <b-form-input v-model="readerInfo.TEN" :disabled="!isEditing"></b-form-input>
            </b-form-group>
            <b-form-group label="Ngày sinh">
                <b-form-input type="date" v-model="readerInfo.NGAYSINH" :disabled="!isEditing"></b-form-input>
            </b-form-group>
            <b-form-group label="Giới tính">
                <b-form-select v-model="readerInfo.PHAI" :disabled="!isEditing">
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                </b-form-select>
            </b-form-group>
            <b-form-group label="Địa chỉ">
                <b-form-input v-model="readerInfo.DIACHI" :disabled="!isEditing"></b-form-input>
            </b-form-group>
            <b-form-group label="Số điện thoại">
                <b-form-input v-model="readerInfo.DIENTHOAI" :disabled="!isEditing"></b-form-input>
            </b-form-group>
            <b-form-group label="Email">
                <b-form-input v-model="readerInfo.Email" disabled></b-form-input>
            </b-form-group>
            <b-button v-if="!isEditing" @click="isEditing = true" variant="primary">Chỉnh sửa</b-button>
            <b-button v-if="isEditing" type="submit" variant="success">Lưu</b-button>
            <b-button v-if="isEditing" @click="isEditing = false" variant="danger">Hủy</b-button>
        </b-form>

        <h2 class="mt-4">Đặt lại mật khẩu</h2>
        <b-button v-if="!isResettingPassword" @click="isResettingPassword = true" variant="warning">
            Đặt lại mật khẩu
        </b-button>
        <b-form v-else @submit.prevent="updatePassword">
            <b-form-group label="Mật khẩu cũ">
                <b-form-input type="password" v-model="oldPassword"></b-form-input>
            </b-form-group>
            <b-form-group label="Mật khẩu mới">
                <b-form-input type="password" v-model="newPassword"></b-form-input>
            </b-form-group>
            <b-form-group label="Xác nhận mật khẩu mới">
                <b-form-input type="password" v-model="confirmPassword"></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="success">Lưu mật khẩu</b-button>
            <b-button @click="isResettingPassword = false" variant="danger">Hủy</b-button>
        </b-form>
    </b-container>
</template>
