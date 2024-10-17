import * as admin from "firebase-admin";
import * as fs from "fs";
import * as path from "path";
import { processEnv } from "./env";

// Caminho para o arquivo keyfirebase.json
const serviceAccountPath = path.resolve(__dirname, "keyfirebase.json");

// Ler o arquivo keyfirebase.json
const serviceAccount = {
  type: processEnv.FIREBASE_TYPE,
  project_id: processEnv.FIREBASE_PROJECT_ID,
  private_key_id: processEnv.FIREBASE_PRIVATE_KEY_ID,
  private_key: processEnv.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: processEnv.FIREBASE_CLIENT_EMAIL,
  client_id: processEnv.FIREBASE_CLIENT_ID,
  auth_uri: processEnv.FIREBASE_AUTH_URI,
  token_uri: processEnv.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: processEnv.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: processEnv.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: processEnv.FIREBASE_UNIVERSE_DOMAIN,
};

// Inicializar o Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: processEnv.FIREBASE_API_KEY, // Substitua pelo URL do seu banco de dados
});

export default admin;
