<template>
    <div>
        <h1>Thông tin nhân viên</h1>
        <p><strong>Họ và tên:</strong> {{ employee.name }}</p>
        <p><strong>Email:</strong> {{ employee.email }}</p>
        <p><strong>Vai trò:</strong> Nhân viên</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import EmployeeService from "@/api/EmployeeService";

const employee = ref({});

onMounted(async () => {
    try {
        employee.value = await EmployeeService.getProfile();
    } catch (error) {
        console.error("Lỗi khi lấy thông tin nhân viên:", error);
    }
});
</script>