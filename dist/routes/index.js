"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_route_1 = __importDefault(require("./user.route"));
const topic_route_1 = __importDefault(require("./topic.route"));
const note_route_1 = __importDefault(require("./note.route"));
const routes = (app) => {
    // Authenticate route
    app.use('/api/v1/auth', user_route_1.default);
    app.use('/api/v1/topics', topic_route_1.default);
    app.use('/api/v1/notes', note_route_1.default);
};
exports.default = routes;
