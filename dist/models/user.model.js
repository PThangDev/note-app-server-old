"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// ENV
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    avatar: {
        type: String,
        trim: true,
        default: 'https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png',
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer',
    },
}, { timestamps: true });
// Middlewares
// userSchema.methods.comparePassword = async function (candidatePassword: string) {
//   const user = this as UserDocument;
//   return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
// };
// userSchema.pre('save', async function (next: any) {
//   let user = this as UserDocument;
//   // Only hash the password if it has been modified (or is new)
//   if (!user.isModified('password')) return next();
//   //Random additional data
//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hashSync(user.password, salt);
//   user.password = hash;
//   return next();
// });
exports.default = mongoose_1.default.model('users', userSchema);
