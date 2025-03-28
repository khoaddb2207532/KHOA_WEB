const EmployeeService = require("../services/employee.service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Thêm nhân viên mới
exports.create = async (req, res, next) => {
  try {
    const { Password, ...employeeData } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!Password) {
      return res.status(400).json({ message: "Mật khẩu là bắt buộc." });
    }

    // Gửi dữ liệu thô (bao gồm mật khẩu) đến service
    const employeeService = new EmployeeService();
    const result = await employeeService.create({ ...employeeData, Password });

    res
      .status(201)
      .json({ message: "Thêm nhân viên thành công!", employee: result });
  } catch (error) {
    console.error("Lỗi khi thêm nhân viên:", error);
    next(error);
  }
};

// Lấy danh sách nhân viên
exports.findAll = async (req, res, next) => {
  try {
    const employeeService = new EmployeeService();
    const employees = await employeeService.find(req.query);
    res.json(employees);
  } catch (error) {
    next(error);
  }
};

// Lấy thông tin nhân viên theo MSNV
exports.findById = async (req, res, next) => {
  try {
    const employeeService = new EmployeeService();
    const employee = await employeeService.findById(req.params.MSNV);
    res.json(employee);
  } catch (error) {
    next(error);
  }
};

// Cập nhật thông tin nhân viên
exports.update = async (req, res, next) => {
  try {
    const employeeService = new EmployeeService();
    const updatedEmployee = await employeeService.update(
      req.params.MSNV,
      req.body
    );
    res.json(updatedEmployee);
  } catch (error) {
    next(error);
  }
};

// Xóa nhân viên
exports.delete = async (req, res, next) => {
  try {
    const employeeService = new EmployeeService();
    const deletedEmployee = await employeeService.delete(req.params.MSNV);
    res.json(deletedEmployee);
  } catch (error) {
    next(error);
  }
};

// Đăng nhập (Xác thực bằng Email)
exports.login = async (req, res, next) => {
  const { Email, Password } = req.body;

  try {
    const employeeService = new EmployeeService();
    const employee = await employeeService.authenticate(Email, Password);

    // Tạo token JWT
    const token = jwt.sign(
      { MSNV: employee.MSNV, Email: employee.Email, ChucVu: employee.ChucVu },
      process.env.JWT_SECRET, // Secret key để mã hóa
      { expiresIn: "1h" } // Token có hiệu lực trong 1 giờ
    );

    res.json({ message: "Đăng nhập thành công!", token });
  } catch (error) {
    next(error);
  }
};
