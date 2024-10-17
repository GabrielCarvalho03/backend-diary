import { FastifyInstance } from "fastify";
import Stripe from "stripe";
import { processEnv } from "../env";
import fastifyRawBody from "fastify-raw-body";
import admin from "../firebaseAdmin";

const db = admin.firestore();

export const transactions = async (app: FastifyInstance) => {
  const stripe = new Stripe(processEnv.STRIPE_SECRET_KEY, {
    apiVersion: "2024-09-30.acacia",
  });
  const mySite = "http://localhost:3000/";
  const endpointSecret = processEnv.STRIPE_WEBHOOK_SECRET;

  let webhookResponse: any = null;

  app.post("/transactions/:plan", async (request, reply) => {
    const { plan } = request.params as { plan: "basic" | "premium" };
    const session = await stripe.checkout.sessions
      .create({
        payment_method_types: ["card"],
        line_items: [
          {
            price:
              plan == "basic"
                ? processEnv.STRIPE_PRICE_BASIC
                : processEnv.STRIPE_PRICE_PREMIUM,
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${mySite}`,
        cancel_url: `${mySite}`,
      })
      .then((session) => reply.send(session.url));
  });

  app.post("/transactions/updatePlan/:id", async (request, reply) => {
    const session = await stripe.checkout.sessions
      .create({
        payment_method_types: ["card"],
        line_items: [
          {
            price: "price_1Q9Xg8D3VTGYS353EDSjAa4H",
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${mySite}`,
        cancel_url: `${mySite}`,
      })
      .then((session) => reply.send(session.url));
  });

  app.get("/transactions/updatePlan/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    if (webhookResponse != null) {
      await db.collection("users").doc(id).update({
        plan: "premium",
      });
    }
    reply.send(webhookResponse);
  });

  app.get("/transactions", async (request, reply) => {
    console.log("webhookResponse", webhookResponse);
    reply.send(webhookResponse);
  });

  app.addContentTypeParser(
    "application/json",
    { parseAs: "buffer" },
    function (req, body, done) {
      done(null, body);
    }
  );

  app.post("/transactions/webhook", async (request, reply) => {
    let event;

    const sig = request.headers["stripe-signature"];
    const rawBody = request.body as Buffer;
    if (!sig) {
      return reply
        .status(400)
        .send("Webhook Error: Stripe signature not provided");
    }

    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
      const session = event.data.object as Stripe.Checkout.Session;
    } catch (err) {
      console.error(`Erro de verificação do webhook: ${err}`);
      return reply.status(400).send(`Webhook Error: ${err}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("sessao completa");
      webhookResponse = { received: true, session };

      setTimeout(() => {
        webhookResponse = null;
      }, 10000);

      console.log("event", event.type);
      return reply.status(200).send({ received: true });
    }
  });
};
