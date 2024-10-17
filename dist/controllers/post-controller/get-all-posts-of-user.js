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
exports.GetAllPostsOfUser = void 0;
const firebaseAdmin_1 = __importDefault(require("../../firebaseAdmin"));
const db = firebaseAdmin_1.default.firestore();
const GetAllPostsOfUser = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = request.params;
    try {
        const allpost = yield db
            .collection("posts")
            .where("userId", "==", userId)
            .get();
        const posts = allpost.docs.map((doc) => doc.data());
        return reply.status(200).send(posts);
    }
    catch (error) {
        return reply.status(500).send({ error: error });
    }
});
exports.GetAllPostsOfUser = GetAllPostsOfUser;
