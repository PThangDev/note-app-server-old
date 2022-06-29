"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAccount = exports.validateUsername = exports.validateEmail = exports.uppercaseFirstLetter = void 0;
const uppercaseFirstLetter = (char) => {
    return char.charAt(0).toUpperCase() + char.slice(1);
};
exports.uppercaseFirstLetter = uppercaseFirstLetter;
const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};
exports.validateEmail = validateEmail;
const validateUsername = (username) => {
    const regex = /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._@]+(?<![_.])$/g;
    return regex.test(String(username).toLocaleLowerCase());
};
exports.validateUsername = validateUsername;
const validateAccount = (account) => {
    const regex = /^(?:[A-Z\d][A-Z\d_-]{5,10}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i;
    return regex.test(String(account).toLocaleLowerCase());
};
exports.validateAccount = validateAccount;
