import BaseService from "./BaseService";

class PublisherService extends BaseService {
  constructor() {
    super("/publishers");
  }
}

export default new PublisherService();
