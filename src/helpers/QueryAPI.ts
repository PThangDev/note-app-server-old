import { IQueryString } from '../types';

class QueryAPI {
  constructor(public query: any, private queryString: any) {}
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
  filter() {
    const queryObj = { ...this.queryString };

    const excludedFields = ['page', 'sort', 'limit', 'search'];

    excludedFields.forEach((el) => delete queryObj[el as keyof IQueryString]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, (match) => '$' + match);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  count() {
    this.query = this.query.count();
    return this;
  }
}

export default QueryAPI;
