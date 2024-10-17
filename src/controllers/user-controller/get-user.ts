import { FastifyReply, FastifyRequest } from "fastify";
import admin from "../../firebaseAdmin";

const db = admin.firestore();

export const GetUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { userId } = request.params as {
    userId: string;
  };
  const user = await db.collection("users").doc(userId).get();
  reply.send(user.data());
};
