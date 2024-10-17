import { FastifyReply, FastifyRequest } from "fastify";
import admin from "../../firebaseAdmin";
import moment from "moment";

const db = admin.firestore();

export const CreateFirstPost = async (
  request: FastifyRequest,
  reply: FastifyReply,
  userId: string,
  post: { title: string; description: string; photo: string }
) => {
  const firstPost = await db.collection("posts").add({
    userId,
    title: post.title,
    description: post.description,
    createdAt: moment(new Date()).toISOString(),
    photo: post.photo,
  });

  return;
};
