import { FastifyReply, FastifyRequest } from "fastify";
import admin from "../../firebaseAdmin";
import moment from "moment";

const db = admin.firestore();

type bodyPost = {
  title: string;
  description?: string;
  photo?: string;
  userId: string;
};

export const CreatePost = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { title, description, photo, userId } = request.body as bodyPost;

  try {
    const post = await db.collection("posts").add({
      title,
      description,
      photo,
      createdAt: moment(new Date()).toISOString(),
      userId,
    });

    return reply.status(201).send({ id: post.id });
  } catch (error) {
    return reply.status(400).send({ error });
  }
};
