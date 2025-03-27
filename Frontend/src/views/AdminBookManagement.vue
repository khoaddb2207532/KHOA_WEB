<template>
    <b-container>
        <h1 class="mt-4">Quản lý Sách</h1>
        <b-button variant="primary" class="mb-3" @click="showAddModal">Thêm Sách</b-button>

        <!-- Bảng hiển thị danh sách sách -->
        <b-table :items="books" :fields="fields" striped hover responsive>
            <template #cell(actions)="row">
                <b-button size="sm" variant="warning" @click="showEditModal(row.item)">Sửa</b-button>
                <b-button size="sm" variant="danger" @click="deleteBook(row.item.MASACH)">Xóa</b-button>
            </template>
        </b-table>

        <!-- Modal thêm/sửa sách -->
        <b-modal v-model="showModal" title="Thông tin Sách" @hide="resetForm">
            <b-form @submit.prevent="saveBook">
                <b-form-group label="Mã Sách" label-for="MASACH">
                    <b-form-input id="MASACH" v-model="form.MASACH" :disabled="isEdit"></b-form-input>
                </b-form-group>
                <b-form-group label="Tên Sách" label-for="TENSACH">
                    <b-form-input id="TENSACH" v-model="form.TENSACH" required></b-form-input>
                </b-form-group>
                <b-form-group label="Đơn Giá" label-for="DONGIA">
                    <b-form-input id="DONGIA" v-model="form.DONGIA" type="number" required></b-form-input>
                </b-form-group>
                <b-form-group label="Số Quyển" label-for="SOQUYEN">
                    <b-form-input id="SOQUYEN" v-model="form.SOQUYEN" type="number" required></b-form-input>
                </b-form-group>
                <b-form-group label="Năm Xuất Bản" label-for="NAMXUATBAN">
                    <b-form-input id="NAMXUATBAN" v-model="form.NAMXUATBAN" type="number" required></b-form-input>
                </b-form-group>
                <b-form-group label="Mã Nhà Xuất Bản" label-for="MANXB">
                    <b-form-input id="MANXB" v-model="form.MANXB" required></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="success">Lưu</b-button>
            </b-form>
        </b-modal>
    </b-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BookService from "@/api/BookService";

const books = ref([]); // Danh sách sách
const fields = [
    { key: "MASACH", label: "Mã Sách" },
    { key: "TENSACH", label: "Tên Sách" },
    { key: "DONGIA", label: "Đơn Giá" },
    { key: "SOQUYEN", label: "Số Quyển" },
    { key: "NAMXUATBAN", label: "Năm Xuất Bản" },
    { key: "MANXB", label: "Mã NXB" },
    { key: "actions", label: "Hành Động" },
];

const showModal = ref(false); // Trạng thái hiển thị modal
const isEdit = ref(false); // Trạng thái chỉnh sửa
const form = ref({
    MASACH: "",
    TENSACH: "",
    DONGIA: 0,
    SOQUYEN: 0,
    NAMXUATBAN: 0,
    MANXB: "",
});

// Lấy danh sách sách từ API
const fetchBooks = async () => {
    try {
        books.value = await BookService.getAll();
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sách:", error);
    }
};

// Hiển thị modal thêm sách
const showAddModal = () => {
    resetForm();
    isEdit.value = false;
    showModal.value = true;
};

// Hiển thị modal sửa sách
const showEditModal = (book) => {
    form.value = { ...book };
    isEdit.value = true;
    showModal.value = true;
};

// Lưu sách (thêm hoặc sửa)
const saveBook = async () => {
    try {
        if (isEdit.value) {
            await BookService.update(form.value.MASACH, form.value);
            alert("Cập nhật sách thành công!");
        } else {
            await BookService.create(form.value);
            alert("Thêm sách thành công!");
        }
        fetchBooks();
        showModal.value = false;
    } catch (error) {
        console.error("Lỗi khi lưu sách:", error);
        alert("Đã xảy ra lỗi khi lưu sách.");
    }
};

// Xóa sách
const deleteBook = async (MASACH) => {
    if (confirm("Bạn có chắc chắn muốn xóa sách này?")) {
        try {
            await BookService.delete(MASACH);
            alert("Xóa sách thành công!");
            fetchBooks();
        } catch (error) {
            console.error("Lỗi khi xóa sách:", error);
            alert("Đã xảy ra lỗi khi xóa sách.");
        }
    }
};

// Reset form
const resetForm = () => {
    form.value = {
        MASACH: "",
        TENSACH: "",
        DONGIA: 0,
        SOQUYEN: 0,
        NAMXUATBAN: 0,
        MANXB: "",
    };
};

// Lấy danh sách sách khi component được mount
onMounted(fetchBooks);
</script>
