import axiosClient from "./axiosClient";

class BaseService {
  constructor(baseUrl) {
    this.api = axiosClient; // Sử dụng axiosClient đã cấu hình
    this.baseUrl = baseUrl; // URL cơ sở cho các API liên quan
  }

  // Lấy tất cả dữ liệu
  async getAll(params = {}) {
    return (await this.api.get(this.baseUrl, { params })).data;
  }

  // Lấy dữ liệu theo ID
  async getById(id) {
    return (await this.api.get(`${this.baseUrl}/${id}`)).data;
  }

  // Tạo mới dữ liệu
  async create(data) {
    return (await this.api.post(this.baseUrl, data)).data;
  }

  // Cập nhật dữ liệu theo ID
  async update(id, data) {
    return (await this.api.put(`${this.baseUrl}/${id}`, data)).data;
  }

  // Xóa dữ liệu theo ID
  async delete(id) {
    return (await this.api.delete(`${this.baseUrl}/${id}`)).data;
  }
}

export default BaseService;
