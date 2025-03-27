import BaseService from "./BaseService";

class BorrowingService extends BaseService {
  constructor() {
    super("/borrowings");
  }

  async createBorrowRequest(data) {
    return (await this.api.post(`${this.baseUrl}/request`, data)).data;
  }

  async getPendingRequests() {
    return (await this.api.get(`${this.baseUrl}/requests/pending`)).data;
  }

  async approveBorrow(maMuon) {
    return (await this.api.put(`${this.baseUrl}/approve/${maMuon}`)).data;
  }

  async returnBook(maMuon) {
    return (await this.api.put(`${this.baseUrl}/return/${maMuon}`)).data;
  }
}

export default new BorrowingService();
