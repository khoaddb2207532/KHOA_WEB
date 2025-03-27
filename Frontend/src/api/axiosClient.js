import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Thêm token tự động vào mọi request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Xử lý lỗi toàn cục
apiClient.interceptors.response.use(
  (response) => {
    // Trả về phản hồi nếu không có lỗi
    return response;
  },
  (error) => {
    // Xử lý lỗi
    if (error.response) {
      // Lỗi từ server (có phản hồi)
      const { status, data } = error.response;

      if (status === 401) {
        // Lỗi xác thực (Unauthorized)
        console.error("Unauthorized! Vui lòng đăng nhập lại.");
        alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        localStorage.removeItem("token"); // Xóa token
        window.location.href = "/login"; // Chuyển hướng đến trang đăng nhập
      } else if (status === 403) {
        // Lỗi quyền truy cập (Forbidden)
        console.error("Forbidden! Bạn không có quyền truy cập.");
        alert("Bạn không có quyền truy cập vào tài nguyên này.");
      } else if (status === 500) {
        // Lỗi server (Internal Server Error)
        console.error("Lỗi server! Vui lòng thử lại sau.");
        alert("Đã xảy ra lỗi từ server. Vui lòng thử lại sau.");
      } else {
        // Các lỗi khác
        console.error(`Lỗi ${status}:`, data.message || "Đã xảy ra lỗi.");
        alert(data.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    } else if (error.request) {
      // Không nhận được phản hồi từ server
      console.error(
        "Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng."
      );
      alert("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.");
    } else {
      // Lỗi khác
      console.error("Lỗi:", error.message);
      alert("Đã xảy ra lỗi. Vui lòng thử lại.");
    }

    // Trả về Promise bị từ chối để các hàm gọi API có thể xử lý tiếp
    return Promise.reject(error);
  }
);

export default apiClient;
