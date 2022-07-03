"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryAPI {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    pagination() {
        const limit = Number(this.queryString.limit) || 300;
        const page = Number(this.queryString.page) || 1;
        const skip = limit * (page - 1);
        this.query = this.query.limit(limit).skip(skip);
        return this;
    }
    sortable(field) {
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
        }
        else {
            this.query = this.query.find();
        }
        return this;
    }
}
exports.default = QueryAPI;
