const ReaderService = require("../services/reader.service");
const jwt = require("jsonwebtoken");

// Đăng ký tài khoản độc giả
exports.register = async (req, res, next) => {
  try {
    const readerService = new ReaderService();
    const result = await readerService.register(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// Đăng nhập và tạo token JWT
exports.login = async (req, res, next) => {
  const { Email, Password } = req.body;

  try {
    const readerService = new ReaderService();
    const reader = await readerService.authenticate(Email, Password);

    const token = jwt.sign(
      { MADOCGIA: reader.MADOCGIA, Email: reader.Email, ChucVu: "reader" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Đăng nhập thành công!", token });
  } catch (error) {
    next(error);
  }
};

// Lấy thông tin độc giả
exports.getInfo = async (req, res, next) => {
  try {
    const readerService = new ReaderService();
    const reader = await readerService.findById(req.params.MADOCGIA);
    res.json(reader);
  } catch (error) {
    next(error);
  }
};

// Cập nhật thông tin tài khoản độc giả
exports.updateInfo = async (req, res, next) => {
  try {
    const readerService = new ReaderService();
    const result = await readerService.update(req.params.MADOCGIA, req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.updatePassword = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("MADOCGIA:", req.params.MADOCGIA);
    const { oldPassword, newPassword } = req.body;
    const madocgia = req.params.MADOCGIA;
    const readerService = new ReaderService();
    await readerService.updatePassword(madocgia, oldPassword, newPassword);
    res.json({ message: "Mật khẩu đã được cập nhật thành công!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Tìm kiếm sách
exports.searchBooks = async (req, res, next) => {
  try {
    const { keyword } = req.query;
    const readerService = new ReaderService();
    const books = await readerService.searchBooks(keyword);
    res.json(books);
  } catch (error) {
    next(error);
  }
};

// Lấy danh sách độc giả
exports.getAllReaders = async (req, res, next) => {
  try {
    const readerService = new ReaderService();
    const readers = await readerService.getAll(); // Gọi phương thức từ service
    res.status(200).json(readers); // Trả về danh sách độc giả
  } catch (error) {
    console.error("Lỗi khi lấy danh sách độc giả:", error);
    next(error); // Chuyển lỗi đến middleware xử lý lỗi
  }

};
