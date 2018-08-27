"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = [
    { name: 'Murílio B. Martins', email: 'peter@marvel.com' },
    { name: 'Mateus B. MArtins', email: 'mateusbms@gmail.com' }
];
class Users {
    static findAll() {
        return Promise.resolve(users);
    }
}
exports.Users = Users;
