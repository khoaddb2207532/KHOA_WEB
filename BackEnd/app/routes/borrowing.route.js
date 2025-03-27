const express = require("express");
const borrowingController = require("../controllers/borrowing.controller");
const { verifyToken, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

// Gửi yêu cầu mượn sách (dành cho độc giả)
router.post("/request", verifyToken, borrowingController.createBorrowRequest);

// Nhân viên lấy danh sách yêu cầu chờ
router.get(
  "/requests/pending",
  verifyToken,
  authorize(["Nhân viên", "Quản lý"]),
  borrowingController.getPendingRequests
);

// Nhân viên xác nhận mượn sách
router.put(
  "/approve/:MaMuon",
  verifyToken,
  authorize(["Nhân viên", "Quản lý"]),
  borrowingController.approveBorrow
);

// Trả sách
router.put(
  "/return/:MaMuon",
  verifyToken,
  authorize(["Nhân viên", "Quản lý"]),
  borrowingController.returnBook
);

module.exports = router;
