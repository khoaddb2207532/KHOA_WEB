<script setup>
import { ref, onMounted } from "vue";
import BookService from "@/api/BookService";

const books = ref([]);
const searchQuery = ref("");

const fetchBooks = async () => {
    try {
        const rawBooks = await BookService.getAll();
        console.log(rawBooks);
        books.value = rawBooks.map(book => {
            const nguonGocTacGia = book["NGUONGOC/TACGIA"] || {}; // Đảm bảo thuộc tính tồn tại
            return {
                ...book,
                NGUONGOC: nguonGocTacGia.NGUONGOC || "Không rõ",
                TACGIA: nguonGocTacGia.TACGIA || "Không rõ",
            };
        });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sách:", error);
    }
};

const searchBooks = async () => {
    try {
        books.value = await BookService.search({ q: searchQuery.value });
    } catch (error) {
        console.error("Lỗi khi tìm kiếm sách:", error);
    }
};

onMounted(fetchBooks);
</script>

<template>
    <b-container>
        <h2 class="my-4">📚 Danh sách Sách</h2>

        <b-row class="mb-3">
            <b-col md="8">
                <b-form-input v-model="searchQuery" placeholder="Tìm kiếm sách..."></b-form-input>
            </b-col>
            <b-col md="4">
                <b-button @click="searchBooks" variant="primary" block>Tìm kiếm</b-button>
            </b-col>
        </b-row>

        <b-table striped hover :items="books" :fields="[
            { key: 'TENSACH', label: 'Tên sách' },
            { key: 'DONGIA', label: 'Đơn giá' },
            { key: 'SOQUYEN', label: 'Số quyển' },
            { key: 'NAMXUATBAN', label: 'Năm xuất bản' },
            { key: 'NGUONGOC', label: 'Nguồn gốc' },
            { key: 'TACGIA', label: 'Tác giả' }
        ]">
            <template #cell(DONGIA)="data">
                {{ data.value }} VNĐ
            </template>
            <template #cell(SOQUYEN)="data">
                {{ data.value }} quyển
            </template>
            <template #cell(NGUONGOC)="data">
                {{ data.value }}
            </template>
            <template #cell(TACGIA)="data">
                {{ data.value }}
            </template>
        </b-table>
    </b-container>
</template>
