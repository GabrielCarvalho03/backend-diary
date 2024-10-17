"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactions = void 0;
const stripe_1 = __importDefault(require("stripe"));
const env_1 = require("../env");
const firebaseAdmin_1 = __importDefault(require("../firebaseAdmin"));
const db = firebaseAdmin_1.default.firestore();
const transactions = (app) => __awaiter(void 0, void 0, void 0, function* () {
    const stripe = new stripe_1.default(env_1.processEnv.STRIPE_SECRET_KEY, {
        apiVersion: "2024-09-30.acacia",
    });
    const mySite = "http://localhost:3000/";
    const endpointSecret = env_1.processEnv.STRIPE_WEBHOOK_SECRET;
    let webhookResponse = null;
    app.post("/transactions/:plan", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { plan } = request.params;
        const session = yield stripe.checkout.sessions
            .create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price: plan == "basic"
                        ? "price_1Q82NZD3VTGYS353rG8gfv6G"
                        : "price_1Q9Xg8D3VTGYS353EDSjAa4H",
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${mySite}`,
            cancel_url: `${mySite}`,
        })
            .then((session) => reply.send(session.url));
    }));
    app.post("/transactions/updatePlan/:id", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const session = yield stripe.checkout.sessions
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
    }));
    app.get("/transactions/updatePlan/:id", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = request.params;
        if (webhookResponse != null) {
            yield db.collection("users").doc(id).update({
                plan: "premium",
            });
        }
        reply.send(webhookResponse);
    }));
    app.get("/transactions", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("webhookResponse", webhookResponse);
        reply.send(webhookResponse);
    }));
    app.addContentTypeParser("application/json", { parseAs: "buffer" }, function (req, body, done) {
        done(null, body);
    });
    app.post("/transactions/webhook", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        let event;
        const sig = request.headers["stripe-signature"];
        const rawBody = request.body;
        if (!sig) {
            return reply
                .status(400)
                .send("Webhook Error: Stripe signature not provided");
        }
        try {
            event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
            const session = event.data.object;
        }
        catch (err) {
            console.error(`Erro de verificação do webhook: ${err}`);
            return reply.status(400).send(`Webhook Error: ${err}`);
        }
        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            console.log("sessao completa");
            webhookResponse = { received: true, session };
            setTimeout(() => {
                webhookResponse = null;
            }, 10000);
            console.log("event", event.type);
            return reply.status(200).send({ received: true });
        }
    }));
});
exports.transactions = transactions;
