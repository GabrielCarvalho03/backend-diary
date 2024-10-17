"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser = void 0;
const firebaseAdmin_1 = __importDefault(require("../../firebaseAdmin"));
const frist_post_1 = require("../post-controller/frist-post");
const send_email_1 = require("../email-controller/send-email");
const db = firebaseAdmin_1.default.firestore();
const CreateUser = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { nameofcouple, email, plan, title, description, photo } = request.body;
    try {
        // Adicionar um documento à coleção "users" sem especificar um ID de documento
        const user = yield db.collection("users").add({
            nameofcouple,
            email,
            plan,
        });
        const updatedUser = yield db.collection("users").doc(user.id).update({
            userId: user.id,
        });
        let post = {
            title,
            description,
            photo,
        };
        yield (0, frist_post_1.CreateFirstPost)(request, reply, user.id, post);
        yield (0, send_email_1.sendEmail)(email, user.id);
        return reply.status(201).send({ id: user.id });
    }
    catch (error) {
        console.log("erro ao criar user", error);
        return reply.status(400).send({ error });
    }
});
exports.CreateUser = CreateUser;
