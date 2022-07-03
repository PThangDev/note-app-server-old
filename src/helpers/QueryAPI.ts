import { IQueryString } from '../types';

class QueryAPI {
  constructor(public query: any, private queryString: IQueryString) {}
  pagination() {
    const limit = Number(this.queryString.limit) || 300;
    const page = Number(this.queryString.page) || 1;
    const skip = limit * (page - 1);

    this.query = this.query.limit(limit).skip(skip);
    return this;
  }
  sortable(field?: string) {
    const { sort } = this.queryString;
    this.query = sort ? this.query.sort(sort) : this.query.sort('-createdAt');

    return this;
  }
  search() {
    const { search } = this.queryString;
    if (search) {
      this.query = this.query.find({
        $text: { $search: search },
      });
    } else {
      this.query = this.query.find();
    }
    return this;
  }
}

export default QueryAPI;
