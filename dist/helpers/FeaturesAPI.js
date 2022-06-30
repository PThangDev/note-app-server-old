"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FeaturesAPI {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    pagination() {
        const limit = Number(this.queryString.limit) || 100;
        const page = Number(this.queryString.page) || 1;
        const skip = limit * (page - 1);
        this.query = this.query.limit(limit).skip(skip);
        return this;
    }
}
exports.default = FeaturesAPI;
