import { defineStore } from "pinia";
import { ref } from "vue";
import ReaderService from "@/api/ReaderService";
import EmployeeService from "@/api/EmployeeService";
import {jwtDecode} from "jwt-decode"; // Thay đổi thành:


export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token") || "");
  const role = ref("");
  const userName = ref("");
  // Giải mã token để lấy role
const decodeToken = async () => {
  if (token.value) {
    try {
      const decoded = jwtDecode(token.value);
      role.value = decoded.ChucVu; // Lấy role từ token

      if (decoded.MADOCGIA && role.value === "reader") {
        // Gọi API để lấy thông tin độc giả dựa trên MADOCGIA
        const reader = await ReaderService.getInfo(decoded.MADOCGIA);
        userName.value = reader.TEN || "Độc giả"; // Lưu tên độc giả
      } else {
        userName.value = role.value; // Nếu không phải reader, hiển thị role
      }
    } catch (error) {
      console.error("Lỗi giải mã token hoặc lấy thông tin độc giả:", error);
      role.value = "";
      userName.value = "";
    }
  }
};
  const login = async (credentials, isAdmin) => {
    try {
      let response;
      if (isAdmin) {
        response = await EmployeeService.login(credentials);
      } else {
        response = await ReaderService.login(credentials);
      }

      token.value = response.token;
      localStorage.setItem("token", response.token);

      decodeToken(); // Giải mã token sau khi đăng nhập

      return true;
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      return false;
    }
  };

  const logout = () => {
    token.value = "";
    role.value = "";
    localStorage.removeItem("token");
  };

  // Giải mã token khi khởi tạo store
  decodeToken();
  // console.log("role", role.value);
  return { token, role,userName, login, logout };
});
