import BaseService from "./BaseService";

class AuthService extends BaseService {
  constructor() {
    super("/auth");
  }

  async login(credentials) {
    return (await this.api.post(`${this.baseUrl}/login`, credentials)).data;
  }

  async register(data) {
    return (await this.api.post(`${this.baseUrl}/register`, data)).data;
  }
}

export default new AuthService();
