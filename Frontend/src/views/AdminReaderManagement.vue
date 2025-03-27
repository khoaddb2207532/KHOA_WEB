<template>
    <b-container>
        <h1 class="mt-4">Quản lý Độc giả</h1>
        <b-button variant="primary" class="mb-3" @click="showAddModal">Thêm Độc giả</b-button>

        <!-- Bảng hiển thị danh sách độc giả -->
        <b-table :items="readers" :fields="fields" striped hover responsive>
            <template #cell(actions)="row">
                <b-button size="sm" variant="info" @click="viewReaderDetails(row.item)">Chi tiết</b-button>
                <b-button size="sm" variant="warning" @click="showEditModal(row.item)">Sửa</b-button>
                <b-button size="sm" variant="danger" @click="deleteReader(row.item.MADOCGIA)">Xóa</b-button>
            </template>
        </b-table>

        <!-- Modal thêm/sửa độc giả -->
        <b-modal v-model="showModal" title="Thông tin Độc giả" @hide="resetForm">
            <b-form @submit.prevent="saveReader">
                <b-form-group label="Mã Độc giả" label-for="MADOCGIA">
                    <b-form-input id="MADOCGIA" v-model="form.MADOCGIA" :disabled="isEdit"></b-form-input>
                </b-form-group>
                <b-form-group label="Họ Lót" label-for="HOLOT">
                    <b-form-input id="HOLOT" v-model="form.HOLOT" required></b-form-input>
                </b-form-group>
                <b-form-group label="Tên" label-for="TEN">
                    <b-form-input id="TEN" v-model="form.TEN" required></b-form-input>
                </b-form-group>
                <b-form-group label="Ngày Sinh" label-for="NGAYSINH">
                    <b-form-input id="NGAYSINH" v-model="form.NGAYSINH" type="date" required></b-form-input>
                </b-form-group>
                <b-form-group label="Giới Tính" label-for="PHAI">
                    <b-form-select id="PHAI" v-model="form.PHAI" :options="genders" required></b-form-select>
                </b-form-group>
                <b-form-group label="Địa chỉ" label-for="DIACHI">
                    <b-form-input id="DIACHI" v-model="form.DIACHI" required></b-form-input>
                </b-form-group>
                <b-form-group label="Số Điện Thoại" label-for="DIENTHOAI">
                    <b-form-input id="DIENTHOAI" v-model="form.DIENTHOAI" type="tel" required></b-form-input>
                </b-form-group>
                <b-form-group label="Email" label-for="Email">
                    <b-form-input id="Email" v-model="form.Email" type="email" required></b-form-input>
                </b-form-group>

                <!-- Trường Password chỉ hiển thị khi thêm mới -->
                <b-form-group v-if="!isEdit" label="Mật khẩu" label-for="Password">
                    <b-form-input id="Password" v-model="form.Password" type="password" required></b-form-input>
                </b-form-group>

                <!-- Nút reset mật khẩu khi sửa -->
                <b-button v-if="isEdit" variant="danger" class="mt-3" @click="resetPassword">Reset Mật khẩu</b-button>

                <b-button type="submit" variant="success" class="mt-3">Lưu</b-button>
            </b-form>
        </b-modal>

        <!-- Modal hiển thị chi tiết độc giả -->
        <b-modal v-model="showDetailsModal" title="Chi tiết Độc giả">
            <p><strong>Mã Độc giả:</strong> {{ selectedReader.MADOCGIA }}</p>
            <p><strong>Họ Lót:</strong> {{ selectedReader.HOLOT }}</p>
            <p><strong>Tên:</strong> {{ selectedReader.TEN }}</p>
            <p><strong>Ngày Sinh:</strong> {{ selectedReader.NGAYSINH }}</p>
            <p><strong>Giới Tính:</strong> {{ selectedReader.PHAI }}</p>
            <p><strong>Địa chỉ:</strong> {{ selectedReader.DIACHI }}</p>
            <p><strong>Số Điện Thoại:</strong> {{ selectedReader.DIENTHOAI }}</p>
            <p><strong>Email:</strong> {{ selectedReader.Email }}</p>
        </b-modal>
    </b-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ReaderService from "@/api/ReaderService";

const readers = ref([]); // Danh sách độc giả
const fields = [
    { key: "MADOCGIA", label: "Mã Độc giả" },
    { key: "HOLOT", label: "Họ Lót" },
    { key: "TEN", label: "Tên" },
    { key: "Email", label: "Email" },
    { key: "actions", label: "Hành Động" },
];

const genders = ["Nam", "Nữ"]; // Các giá trị giới tính

const showModal = ref(false); // Trạng thái hiển thị modal thêm/sửa
const showDetailsModal = ref(false); // Trạng thái hiển thị modal chi tiết
const isEdit = ref(false); // Trạng thái chỉnh sửa
const form = ref({
    MADOCGIA: "",
    HOLOT: "",
    TEN: "",
    NGAYSINH: "",
    PHAI: "",
    DIACHI: "",
    DIENTHOAI: "",
    Email: "",
    Password: "", // Thêm trường Password vào form
});
const selectedReader = ref({}); // Độc giả được chọn để xem chi tiết

// Lấy danh sách độc giả từ API
const fetchReaders = async () => {
    try {
        readers.value = await ReaderService.getAll();
    } catch (error) {
        console.error("Lỗi khi lấy danh sách độc giả:", error);
    }
};

// Hiển thị modal thêm độc giả
const showAddModal = () => {
    resetForm();
    isEdit.value = false;
    showModal.value = true;
};

// Hiển thị modal sửa độc giả
const showEditModal = (reader) => {
    form.value = { ...reader };
    isEdit.value = true;
    showModal.value = true;
};

// Hiển thị modal chi tiết độc giả
const viewReaderDetails = (reader) => {
    selectedReader.value = { ...reader };
    showDetailsModal.value = true;
};

// Lưu độc giả (thêm hoặc sửa)
const saveReader = async () => {
    try {
        if (isEdit.value) {
            await ReaderService.updateInfo(form.value.MADOCGIA, form.value);
            alert("Cập nhật độc giả thành công!");
        } else {
            await ReaderService.create(form.value); // Truyền cả Password khi thêm mới
            alert("Thêm độc giả thành công!");
        }
        fetchReaders();
        showModal.value = false;
    } catch (error) {
        console.error("Lỗi khi lưu độc giả:", error);
        alert("Đã xảy ra lỗi khi lưu độc giả.");
    }
};

// Xóa độc giả
const deleteReader = async (MADOCGIA) => {
    if (confirm("Bạn có chắc chắn muốn xóa độc giả này?")) {
        try {
            await ReaderService.delete(MADOCGIA);
            alert("Xóa độc giả thành công!");
            fetchReaders();
        } catch (error) {
            console.error("Lỗi khi xóa độc giả:", error);
            alert("Đã xảy ra lỗi khi xóa độc giả.");
        }
    }
};

// Reset form
const resetForm = () => {
    form.value = {
        MADOCGIA: "",
        HOLOT: "",
        TEN: "",
        NGAYSINH: "",
        PHAI: "",
        DIACHI: "",
        DIENTHOAI: "",
        Email: "",
        Password: "", // Thêm trường Password vào form
    };
};



// Lấy danh sách độc giả khi component được mount
onMounted(fetchReaders);
</script>