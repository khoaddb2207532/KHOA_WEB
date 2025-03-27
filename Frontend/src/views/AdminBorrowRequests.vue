<script setup>
import { ref, onMounted } from "vue";
import BorrowingService from "@/api/BorrowingService";

const pendingRequests = ref([]);

const fetchPendingRequests = async () => {
    try {
        pendingRequests.value = await BorrowingService.getPendingRequests();
    } catch (error) {
        console.error("Lỗi khi lấy danh sách yêu cầu mượn sách:", error);
    }
};

const approveRequest = async (maMuon) => {
    try {
        await BorrowingService.approveBorrow(maMuon);
        alert("Đã duyệt yêu cầu mượn sách!");
        fetchPendingRequests();
    } catch (error) {
        console.error("Lỗi khi duyệt yêu cầu:", error);
    }
};

onMounted(fetchPendingRequests);
</script>

<template>
    <b-container>
        <h2 class="my-4">📌 Yêu cầu mượn sách đang chờ duyệt</h2>
        <b-table striped hover :items="pendingRequests" :fields="['MaDocGia', 'MaSach', 'NgayMuon', 'action']">
            <template #cell(action)="row">
                <b-button @click="approveRequest(row.item.maMuon)" variant="success">Duyệt</b-button>
            </template>
        </b-table>
    </b-container>
</template>
