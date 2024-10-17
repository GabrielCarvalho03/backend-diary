import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { transactions } from "../routes/transactions";
import { Users } from "../routes/users";
import { Post } from "../routes/post";
import fastifyMailer from "fastify-mailer";
import { emailObjSend } from "../controllers/email-controller/emailObjSend";

export const app = fastify();

app
  .register(fastifyCors, {
    origin: "http://localhost:3000",
    methods: ["GET", "PUT", "POST", "DELETE"],
  })
  .after((err) => {
    if (err) {
      console.error("Erro ao registrar o CORS:", err);
    } else {
      console.log("CORS registrado com sucesso");
    }
  });
//@ts-ignore
app.register(fastifyMailer, emailObjSend);

app.register(transactions);
app.register(Users);
app.register(Post);
