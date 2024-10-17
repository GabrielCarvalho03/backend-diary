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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const get_all_posts_of_user_1 = require("../controllers/post-controller/get-all-posts-of-user");
const create_post_1 = require("../controllers/post-controller/create-post");
const Post = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.post("/posts", create_post_1.CreatePost);
    app.get("/posts/:userId", get_all_posts_of_user_1.GetAllPostsOfUser);
});
exports.Post = Post;
