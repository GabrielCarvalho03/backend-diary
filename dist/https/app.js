"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const transactions_1 = require("../routes/transactions");
const users_1 = require("../routes/users");
const post_1 = require("../routes/post");
const fastify_mailer_1 = __importDefault(require("fastify-mailer"));
const emailObjSend_1 = require("../controllers/email-controller/emailObjSend");
exports.app = (0, fastify_1.default)();
exports.app
    .register(cors_1.default, {
    origin: "http://localhost:3000",
    methods: ["GET", "PUT", "POST", "DELETE"],
})
    .after((err) => {
    if (err) {
        console.error("Erro ao registrar o CORS:", err);
    }
    else {
        console.log("CORS registrado com sucesso");
    }
});
//@ts-ignore
exports.app.register(fastify_mailer_1.default, emailObjSend_1.emailObjSend);
exports.app.register(transactions_1.transactions);
exports.app.register(users_1.Users);
exports.app.register(post_1.Post);
