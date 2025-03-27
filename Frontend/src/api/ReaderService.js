import BaseService from "./BaseService";

class ReaderService extends BaseService {
  constructor() {
    super("/readers");
  }

  async register(data) {
    return (await this.api.post(`${this.baseUrl}/register`, data)).data;
  }

  async login(credentials) {
    return (await this.api.post(`${this.baseUrl}/login`, credentials)).data;
  }

  async searchBooks(query) {
    return (await this.api.get(`${this.baseUrl}/search`, { params: query }))
      .data;
  }

  async getInfo(maDocGia) {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    return (
      await this.api.get(`${this.baseUrl}/${maDocGia}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header
        },
      })
    ).data;
  }

  async updateInfo(maDocGia, data) {
    const token = localStorage.getItem("token");
    return (
      await this.api.put(`${this.baseUrl}/${maDocGia}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
  }

  async updatePassword(maDocGia, oldPassword, newPassword) {
    const token = localStorage.getItem("token");
    return (
      await this.api.put(
        `${this.baseUrl}/${maDocGia}/password`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    ).data;
  }
}

export default new ReaderService();
