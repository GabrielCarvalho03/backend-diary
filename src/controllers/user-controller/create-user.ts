import { FastifyRequest, FastifyReply } from "fastify";
import admin from "../../firebaseAdmin";
import { CreateFirstPost } from "../post-controller/frist-post";
import { title } from "process";
import { sendEmail } from "../email-controller/send-email";

const db = admin.firestore();

export const CreateUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { nameofcouple, email, plan, title, description, photo } =
    request.body as {
      nameofcouple: string;
      email: string;
      title: string;
      description: string;
      photo: string;
      plan: "basic" | "premium";
    };

  try {
    // Adicionar um documento à coleção "users" sem especificar um ID de documento
    const user = await db.collection("users").add({
      nameofcouple,
      email,
      plan,
    });

    const updatedUser = await db.collection("users").doc(user.id).update({
      userId: user.id,
    });

    let post = {
      title,
      description,
      photo,
    };

    await CreateFirstPost(request, reply, user.id, post);
    await sendEmail(email, user.id);

    return reply.status(201).send({ id: user.id });
  } catch (error) {
    console.log("erro ao criar user", error);
    return reply.status(400).send({ error });
  }
};
