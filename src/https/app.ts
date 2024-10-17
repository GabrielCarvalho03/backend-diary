import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { transactions } from "../routes/transactions";
import { Users } from "../routes/users";
import { Post } from "../routes/post";
//@ts-ignore
import fastifyMailer from "fastify-mailer";
import { emailObjSend } from "../controllers/email-controller/emailObjSend";
import { processEnv } from "../env";

export const app = fastify();

app
  .register(fastifyCors, {
    origin: ["http://localhost:3000", processEnv.ORIGIN_HTTP],
    methods: ["GET", "PUT", "POST", "DELETE"],
  })
  .after((err) => {
    if (err) {
      console.error("Erro ao registrar o CORS:", err);
    } else {
      console.log("CORS registrado com sucesso");
    }
  });
app.register(fastifyMailer, emailObjSend);

app.register(transactions);
app.register(Users);
app.register(Post);
