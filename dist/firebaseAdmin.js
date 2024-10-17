"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
const path = __importStar(require("path"));
const env_1 = require("./env");
// Caminho para o arquivo keyfirebase.json
const serviceAccountPath = path.resolve(__dirname, "keyfirebase.json");
// Ler o arquivo keyfirebase.json
const serviceAccount = {
    type: env_1.processEnv.FIREBASE_TYPE,
    project_id: env_1.processEnv.FIREBASE_PROJECT_ID,
    private_key_id: env_1.processEnv.FIREBASE_PRIVATE_KEY_ID,
    private_key: env_1.processEnv.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: env_1.processEnv.FIREBASE_CLIENT_EMAIL,
    client_id: env_1.processEnv.FIREBASE_CLIENT_ID,
    auth_uri: env_1.processEnv.FIREBASE_AUTH_URI,
    token_uri: env_1.processEnv.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: env_1.processEnv.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: env_1.processEnv.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: env_1.processEnv.FIREBASE_UNIVERSE_DOMAIN,
};
// Inicializar o Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: env_1.processEnv.FIREBASE_API_KEY, // Substitua pelo URL do seu banco de dados
});
exports.default = admin;
