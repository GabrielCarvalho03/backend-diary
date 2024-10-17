import "fastify";
import { Transporter } from "nodemailer";

declare module "fastify" {
  interface FastifyInstance {
    mailer: Transporter;
  }
}
