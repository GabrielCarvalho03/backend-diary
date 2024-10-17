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
exports.CreateFirstPost = void 0;
const firebaseAdmin_1 = __importDefault(require("../../firebaseAdmin"));
const moment_1 = __importDefault(require("moment"));
const db = firebaseAdmin_1.default.firestore();
const CreateFirstPost = (request, reply, userId, post) => __awaiter(void 0, void 0, void 0, function* () {
    const firstPost = yield db.collection("posts").add({
        userId,
        title: post.title,
        description: post.description,
        createdAt: (0, moment_1.default)(new Date()).toISOString(),
        photo: post.photo,
    });
    return;
});
exports.CreateFirstPost = CreateFirstPost;
