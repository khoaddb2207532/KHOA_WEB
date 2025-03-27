<template>
    <b-container>
        <h1 class="mt-4">Quản lý Nhà Xuất Bản</h1>
        <b-button variant="primary" class="mb-3" @click="showAddModal">Thêm Nhà Xuất Bản</b-button>

        <!-- Bảng hiển thị danh sách nhà xuất bản -->
        <b-table :items="publishers" :fields="fields" striped hover responsive>
            <template #cell(actions)="row">
                <b-button size="sm" variant="warning" @click="showEditModal(row.item)">Sửa</b-button>
                <b-button size="sm" variant="danger" @click="deletePublisher(row.item.MANXB)">Xóa</b-button>
                <b-button size="sm" variant="info" @click="viewBooks(row.item.MANXB)">Xem Sách</b-button>
            </template>
        </b-table>

        <!-- Modal thêm/sửa nhà xuất bản -->
        <b-modal v-model="showModal" title="Thông tin Nhà Xuất Bản" @hide="resetForm">
            <b-form @submit.prevent="savePublisher">
                <b-form-group label="Mã Nhà Xuất Bản" label-for="MANXB">
                    <b-form-input id="MANXB" v-model="form.MANXB" :disabled="isEdit"></b-form-input>
                </b-form-group>
                <b-form-group label="Tên Nhà Xuất Bản" label-for="TENNXB">
                    <b-form-input id="TENNXB" v-model="form.TENNXB" required></b-form-input>
                </b-form-group>
                <b-form-group label="Địa Chỉ" label-for="DIACHI">
                    <b-form-input id="DIACHI" v-model="form.DIACHI" required></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="success">Lưu</b-button>
            </b-form>
        </b-modal>

        <!-- Modal hiển thị danh sách sách -->
        <b-modal v-model="showBooksModal" title="Danh sách Sách">
            <b-table :items="books" :fields="bookFields" striped hover responsive></b-table>
        </b-modal>
    </b-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import PublisherService from "@/api/PublisherService";
import BookService from "@/api/BookService";

const publishers = ref([]); // Danh sách nhà xuất bản
const books = ref([]); // Danh sách sách thuộc nhà xuất bản
const fields = [
    { key: "MANXB", label: "Mã Nhà Xuất Bản" },
    { key: "TENNXB", label: "Tên Nhà Xuất Bản" },
    { key: "DIACHI", label: "Địa Chỉ" },
    { key: "actions", label: "Hành Động" },
];
const bookFields = [
    { key: "MASACH", label: "Mã Sách" },
    { key: "TENSACH", label: "Tên Sách" },
    { key: "DONGIA", label: "Đơn Giá" },
    { key: "SOQUYEN", label: "Số Quyển" },
];

const showModal = ref(false); // Trạng thái hiển thị modal thêm/sửa
const showBooksModal = ref(false); // Trạng thái hiển thị modal danh sách sách
const isEdit = ref(false); // Trạng thái chỉnh sửa
const form = ref({
    MANXB: "",
    TENNXB: "",
    DIACHI: "",
});

// Lấy danh sách nhà xuất bản từ API
const fetchPublishers = async () => {
    try {
        publishers.value = await PublisherService.getAll();
    } catch (error) {
        console.error("Lỗi khi lấy danh sách nhà xuất bản:", error);
    }
};

// Hiển thị modal thêm nhà xuất bản
const showAddModal = () => {
    resetForm();
    isEdit.value = false;
    showModal.value = true;
};

// Hiển thị modal sửa nhà xuất bản
const showEditModal = (publisher) => {
    form.value = { ...publisher };
    isEdit.value = true;
    showModal.value = true;
};

// Lưu nhà xuất bản (thêm hoặc sửa)
const savePublisher = async () => {
    try {
        if (isEdit.value) {
            await PublisherService.update(form.value.MANXB, form.value);
            alert("Cập nhật nhà xuất bản thành công!");
        } else {
            await PublisherService.create(form.value);
            alert("Thêm nhà xuất bản thành công!");
        }
        fetchPublishers();
        showModal.value = false;
    } catch (error) {
        console.error("Lỗi khi lưu nhà xuất bản:", error);
        alert("Đã xảy ra lỗi khi lưu nhà xuất bản.");
    }
};

// Xóa nhà xuất bản
const deletePublisher = async (MANXB) => {
    if (confirm("Bạn có chắc chắn muốn xóa nhà xuất bản này?")) {
        try {
            await PublisherService.delete(MANXB);
            alert("Xóa nhà xuất bản thành công!");
            fetchPublishers();
        } catch (error) {
            console.error("Lỗi khi xóa nhà xuất bản:", error);
            alert("Đã xảy ra lỗi khi xóa nhà xuất bản.");
        }
    }
};

// Hiển thị danh sách sách thuộc nhà xuất bản
const viewBooks = async (MANXB) => {
    try {
        books.value = await BookService.findBooksByPublisher(MANXB);
        showBooksModal.value = true;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sách:", error);
        alert("Đã xảy ra lỗi khi lấy danh sách sách.");
    }
};

// Reset form
const resetForm = () => {
    form.value = {
        MANXB: "",
        TENNXB: "",
        DIACHI: "",
    };
};

// Lấy danh sách nhà xuất bản khi component được mount
onMounted(fetchPublishers);
</script>