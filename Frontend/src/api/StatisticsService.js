import BaseService from "./BaseService";

class StatisticsService extends BaseService {
  constructor() {
    super("/statistics");
  }

  async getTopBorrowedBooks() {
    return (await this.api.get(`${this.baseUrl}/top-borrowed-books`)).data;
  }
}

export default new StatisticsService();
