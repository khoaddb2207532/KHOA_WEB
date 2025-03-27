<script setup>
import { ref, onMounted } from "vue";
import StatisticsService from "@/api/StatisticsService";

const topBooks = ref([]);

const fetchTopBorrowedBooks = async () => {
    try {
        topBooks.value = await StatisticsService.getTopBorrowedBooks();
    } catch (error) {
        console.error("Lỗi khi lấy thống kê sách:", error);
    }
};

onMounted(fetchTopBorrowedBooks);
</script>

<template>
    <b-container>
        <h2 class="my-4">📊 Thống kê Sách Mượn Nhiều Nhất</h2>
        <b-table striped hover :items="topBooks" :fields="['TenSach', 'TacGia', 'SoLanMuon']">
            <template #cell(SoLanMuon)="data">
                <b-badge variant="primary">{{ data.value }} lần</b-badge>
            </template>
        </b-table>
    </b-container>
</template>
