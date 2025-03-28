import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import AdminDashboard from "@/views/AdminDashboard.vue";
import EmployeeDashboard from "@/views/EmployeeDashboard.vue";
import ReaderDashboard from "@/views/ReaderDashboard.vue";
import AdminBookManagement from "@/views/AdminBookManagement.vue";
import AdminPublisherManagement from "@/views/AdminPublisherManagement.vue";
import AdminEmployeeManagement from "@/views/AdminEmployeeManagement.vue";
import AdminReaderManagement from "@/views/AdminReaderManagement.vue";
import AdminBorrowingManagement from "@/views/AdminBorrowingManagement.vue";
import EmployeeProfile from "@/views/EmployeeProfile.vue";
import ReaderBorrowings from "@/views/ReaderBorrowings.vue";
import { useAuthStore } from "@/store/authStore";
import ReaderProfile from "@/views/ReaderProfile.vue";
import BorrowingManagement from "@/views/BorrowingManagement.vue";
const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register }, // Đăng ký tài khoản

  // Admin routes
  {
    path: "/admin",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: { requiresAuth: true, role: "Quản Lý" },
    children: [
      {
        path: "book-management",
        name: "AdminBookManagement",
        component: AdminBookManagement,
        meta: { requiresAuth: true, roles: ["Quản Lý", "Nhân Viên"] }, // Thêm quyền cho Nhân Viên
      },
      {
        path: "publisher-management",
        name: "AdminPublisherManagement",
        component: AdminPublisherManagement,
        meta: { requiresAuth: true, roles: ["Quản Lý", "Nhân Viên"] }, // Thêm quyền cho Nhân Viên
      },
      {
        path: "employee-management",
        name: "AdminEmployeeManagement",
        component: AdminEmployeeManagement,
      },
      {
        path: "reader-management",
        name: "AdminReaderManagement",
        component: AdminReaderManagement,
      },
      {
        path: "borrowing-management",
        name: "AdminBorrowingManagement",
        component: BorrowingManagement,
        meta: { requiresAuth: true, roles: ["Quản Lý", "Nhân Viên"] },
      },
    ],
  },

  // Employee routes
  {
    path: "/employee",
    name: "EmployeeDashboard",
    component: EmployeeDashboard,
    meta: { requiresAuth: true, role: "Nhân Viên" },
    children: [
      { path: "profile", name: "EmployeeProfile", component: EmployeeProfile }, // Thông tin nhân viên
    ],
  },

  // Reader routes
  {
    path: "/reader",
    name: "ReaderDashboard",
    component: ReaderDashboard,
    meta: { requiresAuth: true, role: "reader" },
    children: [
      {
        path: "profile",
        name: "ReaderProfile",
        component: ReaderProfile,
      },
      {
        path: "borrowings",
        name: "ReaderBorrowings",
        component: ReaderBorrowings,
      }, // Sách đang mượn
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ Middleware kiểm tra đăng nhập & phân quyền
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth) {
    if (!authStore.token) {
      alert("Bạn cần đăng nhập để truy cập trang này.");
      next("/login");
    } else if (to.meta.roles && !to.meta.roles.includes(authStore.role)) {
      alert("Bạn không có quyền truy cập vào trang này.");
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
