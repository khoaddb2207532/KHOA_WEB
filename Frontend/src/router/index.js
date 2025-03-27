import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import AdminDashboard from "@/views/AdminDashboard.vue";
import ReaderProfile from "@/views/ReaderProfile.vue";
import BorrowingPage from "@/views/BorrowingPage.vue";
import AdminBorrowRequests from "@/views/AdminBorrowRequests.vue";
import TopBorrowedBooks from "@/views/TopBorrowedBooks.vue";
import Login from "@/views/Login.vue";
import EmployeeDashboard from "@/views/EmployeeDashboard.vue"; // Import EmployeeDashboard
import { useAuthStore } from "@/store/authStore";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  {
    path: "/admin",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: { requiresAuth: true, role: "Quản Lý" },
  },
  {
    path: "/reader",
    name: "ReaderProfile",
    component: ReaderProfile,
    meta: { requiresAuth: true, role: "" },
  },
  {
    path: "/employee",
    name: "EmployeeDashboard",
    component: EmployeeDashboard,
    meta: { requiresAuth: true, role: "Nhân Viên" },
  },
  {
    path: "/borrowings",
    name: "BorrowingPage",
    component: BorrowingPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/borrow-requests",
    name: "AdminBorrowRequests",
    component: AdminBorrowRequests,
    meta: { requiresAuth: true, role: "Quản Lý" },
  },
  {
    path: "/statistics/top-books",
    name: "TopBorrowedBooks",
    component: TopBorrowedBooks,
    meta: { requiresAuth: true, role: "Quản Lý" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ Middleware kiểm tra đăng nhập & phân quyền
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Kiểm tra nếu route yêu cầu đăng nhập
  if (to.meta.requiresAuth) {
    if (!authStore.token) {
      // Chưa đăng nhập, chuyển hướng đến trang login
      next("/login");
    } else {
      // Đã đăng nhập, kiểm tra role
      if (to.meta.role && to.meta.role !== authStore.role) {
        // Role không khớp, chuyển hướng đến trang login
        alert("Bạn không có quyền truy cập vào trang này!");
        next("/login");
      } else {
        // Role khớp, cho phép truy cập
        next();
      }
    }
  } else {
    // Route không yêu cầu đăng nhập, cho phép truy cập
    next();
  }
});

export default router;
