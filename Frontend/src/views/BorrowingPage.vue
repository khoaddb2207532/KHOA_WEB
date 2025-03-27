<script setup>
import { ref, onMounted } from "vue";
import BorrowingService from "@/api/BorrowingService";
import { useAuthStore } from "@/store/authStore";

const authStore = useAuthStore();
const borrowedBooks = ref([]);

const fetchBorrowedBooks = async () => {
    try {
        borrowedBooks.value = await BorrowingService.getBorrowedBooks(authStore.token);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sách mượn:", error);
    }
};

const returnBook = async (maMuon) => {
    try {
        await BorrowingService.returnBook(maMuon);
        alert("Trả sách thành công!");
        fetchBorrowedBooks();
    } catch (error) {
        console.error("Lỗi khi trả sách:", error);
    }
};

onMounted(fetchBorrowedBooks);
</script>

<template>
    <b-container>
        <h2 class="my-4">📖 Sách đang mượn</h2>
        <b-table striped hover :items="borrowedBooks" :fields="['TenSach', 'NgayMuon', 'NgayTra', 'action']">
            <template #cell(action)="row">
                <b-button @click="returnBook(row.item.maMuon)" variant="danger">Trả sách</b-button>
            </template>
        </b-table>
    </b-container>
</template>
