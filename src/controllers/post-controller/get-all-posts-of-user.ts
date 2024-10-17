import { FastifyReply, FastifyRequest } from "fastify";
import admin from "../../firebaseAdmin";

const db = admin.firestore();

export const GetAllPostsOfUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { userId } = request.params as {
    userId: string;
  };

  try {
    const allpost = await db
      .collection("posts")
      .where("userId", "==", userId)
      .get();
    const posts = allpost.docs.map((doc) => doc.data());

    return reply.status(200).send(posts);
  } catch (error) {
    return reply.status(500).send({ error: error });
  }
};
