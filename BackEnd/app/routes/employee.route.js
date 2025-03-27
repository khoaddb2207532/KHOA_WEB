const express = require("express");
const employeeController = require("../controllers/employee.controller");
const { verifyToken, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

// Đăng nhập bằng Email và Password
router.post("/login", employeeController.login);

// Thêm nhân viên mới (Chỉ Quản lý có quyền)
router.post(
  "/",
  verifyToken,
  authorize(["Quản lý"]),
  employeeController.create
);

// Lấy danh sách nhân viên (Chỉ Quản lý có quyền)
router.get(
  "/",
  verifyToken,
  authorize(["Quản lý"]),
  employeeController.findAll
);

// Lấy thông tin nhân viên cụ thể theo MSNV (Chỉ Quản lý có quyền)
router.get(
  "/:MSNV",
  verifyToken,
  authorize(["Quản lý"]),
  employeeController.findById
);

// Cập nhật thông tin nhân viên (Chỉ Quản lý có quyền)
router.put(
  "/:MSNV",
  verifyToken,
  authorize(["Quản lý"]),
  employeeController.update
);

// Xóa nhân viên (Chỉ Quản lý có quyền)
router.delete(
  "/:MSNV",
  verifyToken,
  authorize(["Quản lý"]),
  employeeController.delete
);

module.exports = router;
