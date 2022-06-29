"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = __importDefault(require("./configs/database"));
const errorHandling_middleware_1 = __importDefault(require("./middlewares/errorHandling.middleware"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Connect database
(0, database_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
(0, routes_1.default)(app);
//Error handling
app.use(errorHandling_middleware_1.default);
app.listen(PORT, () => {
    console.log(`App listen on PORT : ${PORT}`);
});
