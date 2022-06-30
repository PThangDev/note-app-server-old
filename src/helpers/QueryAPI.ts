import { IQueryString } from '../types';

class QueryAPI {
  constructor(public query: any, private queryString: IQueryString) {}
  pagination() {
    const limit = Number(this.queryString.limit) || 100;
    const page = Number(this.queryString.page) || 1;
    const skip = limit * (page - 1);

    this.query = this.query.limit(limit).skip(skip);
    return this;
  }
}

export default QueryAPI;
