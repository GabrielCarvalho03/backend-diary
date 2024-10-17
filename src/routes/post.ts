import { FastifyInstance } from "fastify";
import { GetAllPostsOfUser } from "../controllers/post-controller/get-all-posts-of-user";
import { CreatePost } from "../controllers/post-controller/create-post";

export const Post = async (app: FastifyInstance) => {
    app.post("/posts", CreatePost);
  app.get("/posts/:userId", GetAllPostsOfUser);
};
