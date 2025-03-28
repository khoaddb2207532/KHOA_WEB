<template>
    <b-container>
        <h1 class="mt-4">Sách đang mượn</h1>

        <!-- Hiển thị thông báo nếu không có sách đang mượn -->
        <b-alert v-if="borrowings.length === 0" variant="info">
            Bạn hiện không có sách nào đang mượn.
        </b-alert>

        <!-- Hiển thị danh sách sách đang mượn -->
        <b-table striped hover :items="borrowings" :fields="fields" v-if="borrowings.length > 0">
            <template #cell(NGAYMUON)="data">
                {{ new Date(data.value).toLocaleDateString() }}
            </template>
            <template #cell(HANTRA)="data">
                {{ new Date(data.value).toLocaleDateString() }}
            </template>
        </b-table>
    </b-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BorrowingService from "@/api/BorrowingService";

const borrowings = ref([]);
const fields = [
    { key: "MASACH.TENSACH", label: "Tên Sách" },
    { key: "MASACH.TACGIA", label: "Tác Giả" },
    { key: "NGAYMUON", label: "Ngày Mượn" },
    { key: "HANTRA", label: "Hạn Trả" },
];

const fetchBorrowings = async () => {
    try {
        // Gọi API để lấy danh sách sách đang mượn
        borrowings.value = await BorrowingService.getReaderBorrowings();
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sách đang mượn:", error);
    }
};

onMounted(fetchBorrowings);
</script>