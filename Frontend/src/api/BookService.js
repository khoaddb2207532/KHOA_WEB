import BaseService from "./BaseService";

class BookService extends BaseService {
  constructor() {
    super("/books");
  }

  async search(query) {
    return (await this.api.get(`${this.baseUrl}/search`, { params: query }))
      .data;
  }

  async findBooksByPublisher(publisherId) {
    return (await this.api.get(`${this.baseUrl}/publisher/${publisherId}`))
      .data;
  }
}

export default new BookService();
