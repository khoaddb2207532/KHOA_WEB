<template>
    <b-container>
        <h1 class="mt-4">Quản lý Nhân viên</h1>
        <b-button variant="primary" class="mb-3" @click="showAddModal">Thêm Nhân viên</b-button>

        <!-- Bảng hiển thị danh sách nhân viên -->
        <b-table :items="employees" :fields="fields" striped hover responsive>
            <template #cell(actions)="row">
                <b-button size="sm" variant="info" @click="viewEmployeeDetails(row.item)">Chi tiết</b-button>
                <b-button size="sm" variant="warning" @click="showEditModal(row.item)">Sửa</b-button>
                <b-button size="sm" variant="danger" @click="deleteEmployee(row.item.MSNV)">Xóa</b-button>
            </template>
        </b-table>

        <!-- Modal thêm/sửa nhân viên -->
        <b-modal v-model="showModal" title="Thông tin Nhân viên" @hide="resetForm">
            <b-form @submit.prevent="saveEmployee">
                <b-form-group label="Mã Nhân viên" label-for="MSNV">
                    <b-form-input id="MSNV" v-model="form.MSNV" :disabled="isEdit"></b-form-input>
                </b-form-group>
                <b-form-group label="Họ và Tên" label-for="HoTenNV">
                    <b-form-input id="HoTenNV" v-model="form.HoTenNV" required></b-form-input>
                </b-form-group>
                <b-form-group label="Email" label-for="Email">
                    <b-form-input id="Email" v-model="form.Email" type="email" required></b-form-input>
                </b-form-group>
                <b-form-group label="Chức vụ" label-for="ChucVu">
                    <b-form-select id="ChucVu" v-model="form.ChucVu" :options="roles" required></b-form-select>
                </b-form-group>
                <b-form-group label="Địa chỉ" label-for="DiaChi">
                    <b-form-input id="DiaChi" v-model="form.DiaChi" required></b-form-input>
                </b-form-group>
                <b-form-group label="Số điện thoại" label-for="SoDienThoai">
                    <b-form-input id="SoDienThoai" v-model="form.SoDienThoai" type="tel" required></b-form-input>
                </b-form-group>
                <!-- Thêm trường mật khẩu -->
                <b-form-group label="Mật khẩu" label-for="Password" v-if="!isEdit">
                    <b-form-input id="Password" v-model="form.Password" type="password" required></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="success">Lưu</b-button>
            </b-form>
        </b-modal>

        <!-- Modal hiển thị chi tiết nhân viên -->
        <b-modal v-model="showDetailsModal" title="Chi tiết Nhân viên">
            <p><strong>Mã Nhân viên:</strong> {{ selectedEmployee.MSNV }}</p>
            <p><strong>Họ và Tên:</strong> {{ selectedEmployee.HoTenNV }}</p>
            <p><strong>Email:</strong> {{ selectedEmployee.Email }}</p>
            <p><strong>Chức vụ:</strong> {{ selectedEmployee.ChucVu }}</p>
            <p><strong>Địa chỉ:</strong> {{ selectedEmployee.DiaChi }}</p>
            <p><strong>Số điện thoại:</strong> {{ selectedEmployee.SoDienThoai }}</p>
        </b-modal>
    </b-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import EmployeeService from "@/api/EmployeeService";

const employees = ref([]); // Danh sách nhân viên
const fields = [
    { key: "MSNV", label: "Mã Nhân viên" },
    { key: "HoTenNV", label: "Họ và Tên" },
    { key: "Email", label: "Email" },
    { key: "ChucVu", label: "Chức vụ" },
    { key: "actions", label: "Hành Động" },
];

const roles = ["Quản Lý", "Nhân Viên"]; // Các vai trò

const showModal = ref(false); // Trạng thái hiển thị modal thêm/sửa
const showDetailsModal = ref(false); // Trạng thái hiển thị modal chi tiết
const isEdit = ref(false); // Trạng thái chỉnh sửa
const form = ref({
    MSNV: "",
    HoTenNV: "",
    Email: "",
    ChucVu: "",
    DiaChi: "",
    SoDienThoai: "",
    Password: "", // Thêm trường mật khẩu
});
const selectedEmployee = ref({}); // Nhân viên được chọn để xem chi tiết

// Lấy danh sách nhân viên từ API
const fetchEmployees = async () => {
    try {
        employees.value = await EmployeeService.getAll();
    } catch (error) {
        console.error("Lỗi khi lấy danh sách nhân viên:", error);
    }
};

// Hiển thị modal thêm nhân viên
const showAddModal = () => {
    resetForm();
    isEdit.value = false;
    showModal.value = true;
};

// Hiển thị modal sửa nhân viên
const showEditModal = (employee) => {
    form.value = { ...employee };
    isEdit.value = true;
    showModal.value = true;
};

// Hiển thị modal chi tiết nhân viên
const viewEmployeeDetails = (employee) => {
    selectedEmployee.value = { ...employee };
    showDetailsModal.value = true;
};

// Lưu nhân viên (thêm hoặc sửa)
const saveEmployee = async () => {
    try {
        if (isEdit.value) {
            await EmployeeService.update(form.value.MSNV, form.value);
            alert("Cập nhật nhân viên thành công!");
        } else {
            const { Password, ...employeeData } = form.value; // Tách mật khẩu ra
            await EmployeeService.create({ ...employeeData, Password });
            alert("Thêm nhân viên thành công!");
        }
        fetchEmployees();
        showModal.value = false;
    } catch (error) {
        console.error("Lỗi khi lưu nhân viên:", error);
        alert("Đã xảy ra lỗi khi lưu nhân viên.");
    }
};

// Xóa nhân viên
const deleteEmployee = async (MSNV) => {
    if (confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
        try {
            await EmployeeService.delete(MSNV);
            alert("Xóa nhân viên thành công!");
            fetchEmployees();
        } catch (error) {
            console.error("Lỗi khi xóa nhân viên:", error);
            alert("Đã xảy ra lỗi khi xóa nhân viên.");
        }
    }
};

// Reset form
const resetForm = () => {
    form.value = {
        MSNV: "",
        HoTenNV: "",
        Email: "",
        ChucVu: "",
        DiaChi: "",
        SoDienThoai: "",
        Password: "", // Thêm trường mật khẩu
    };
};

// Lấy danh sách nhân viên khi component được mount
onMounted(fetchEmployees);
</script>