import { FastifyInstance } from "fastify";
import { CreateUser } from "../controllers/user-controller/create-user";
import { GetUser } from "../controllers/user-controller/get-user";

export const Users = async (app: FastifyInstance) => {
  app.get("/users/:userId", GetUser);
  app.post("/users", CreateUser);
  
};
