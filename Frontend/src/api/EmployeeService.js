import BaseService from "./BaseService";

class EmployeeService extends BaseService {
  constructor() {
    super("/employees");
  }

  async login(credentials) {
    return (await this.api.post(`${this.baseUrl}/login`, credentials)).data;
  }
}

export default new EmployeeService();
