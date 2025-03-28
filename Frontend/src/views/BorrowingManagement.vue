<script setup>
import { ref, onMounted } from "vue";
import BorrowingService from "@/api/BorrowingService";

const borrowings = ref([]);

// Lấy danh sách tất cả yêu cầu mượn sách
const fetchBorrowings = async () => {
    try {
        borrowings.value = await BorrowingService.getAllBorrowings();
    } catch (error) {
        console.error("Lỗi khi lấy danh sách yêu cầu mượn sách:", error);
    }
};

// Duyệt yêu cầu mượn sách
const approveBorrowing = async (borrowing) => {
    const confirmApprove = window.confirm(`Bạn có chắc chắn muốn duyệt yêu cầu mượn sách với mã "${borrowing.MaMuon}" không?`);
    if (!confirmApprove) {
        return;
    }

    try {
        const response = await BorrowingService.approveBorrow(borrowing.MaMuon);
        alert(response.message || "Yêu cầu mượn sách đã được duyệt!");
        fetchBorrowings(); // Cập nhật danh sách sau khi duyệt
    } catch (error) {
        console.error("Lỗi khi duyệt yêu cầu mượn sách:", error);
        alert("Đã xảy ra lỗi khi duyệt yêu cầu mượn sách.");
    }
};

// Trả sách
const returnBook = async (borrowing) => {
    const confirmReturn = window.confirm(`Bạn có chắc chắn muốn đánh dấu sách với mã "${borrowing.MaMuon}" là đã trả không?`);
    if (!confirmReturn) {
        return;
    }

    try {
        const response = await BorrowingService.returnBook(borrowing.MaMuon);
        alert(response.message || "Sách đã được đánh dấu là đã trả!");
        fetchBorrowings(); // Cập nhật danh sách sau khi trả sách
    } catch (error) {
        console.error("Lỗi khi trả sách:", error);
        alert("Đã xảy ra lỗi khi trả sách.");
    }
};

onMounted(fetchBorrowings);
</script>

<template>
    <b-container>
        <h2 class="my-4">📋 Quản lý mượn sách</h2>

        <b-table striped hover :items="borrowings" :fields="[
            { key: 'MaMuon', label: 'Mã mượn' },
            { key: 'MADOCGIA', label: 'Mã độc giả' },
            { key: 'MASACH', label: 'Mã sách' },
            { key: 'NGAYMUON', label: 'Ngày mượn' },
            { key: 'TrangThai', label: 'Trạng thái' },
            { key: 'actions', label: 'Hành động' }
        ]">
            <template #cell(NGAYMUON)="data">
                {{ new Date(data.value).toLocaleDateString() }}
            </template>
            <template #cell(actions)="row">
                <b-button variant="success" size="sm" @click="approveBorrowing(row.item)"
                    v-if="row.item.TrangThai === 'pending'">Duyệt</b-button>
                <b-button variant="warning" size="sm" @click="returnBook(row.item)"
                    v-if="row.item.TrangThai === 'approved'">Trả sách</b-button>
            </template>
        </b-table>
    </b-container>
</template>