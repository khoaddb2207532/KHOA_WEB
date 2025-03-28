<script setup>
import { ref, onMounted } from "vue";
import BookService from "@/api/BookService";
import BorrowingService from "@/api/BorrowingService";

const books = ref([]);
const searchQuery = ref("");

// Lấy danh sách sách
const fetchBooks = async () => {
    try {
        const rawBooks = await BookService.getAll();
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

// Tìm kiếm sách
const searchBooks = async () => {
    try {
        books.value = await BookService.search({ q: searchQuery.value });
    } catch (error) {
        console.error("Lỗi khi tìm kiếm sách:", error);
    }
};

// Gửi yêu cầu mượn sách với xác nhận
const borrowBook = async (book) => {
    const confirmBorrow = window.confirm(`Bạn có chắc chắn muốn mượn sách "${book.TENSACH}" không?`);
    if (!confirmBorrow) {
        return; // Nếu người dùng chọn "Hủy", thoát khỏi hàm
    }

    try {
        const response = await BorrowingService.createBorrowRequest({
            MASACH: book.MASACH,
        });
        alert(response.message || "Yêu cầu mượn sách đã được gửi thành công!");
    } catch (error) {
        console.error("Lỗi khi gửi yêu cầu mượn sách:", error);
        alert("Đã xảy ra lỗi khi gửi yêu cầu mượn sách.");
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
            { key: 'TACGIA', label: 'Tác giả' },
            { key: 'actions', label: 'Hành động' }
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
            <template #cell(actions)="row">
                <b-button variant="success" size="sm" @click="borrowBook(row.item)">Mượn Sách</b-button>
            </template>
        </b-table>
    </b-container>
</template>
