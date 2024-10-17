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
exports.sendEmail = void 0;
const qrcode_1 = __importDefault(require("qrcode"));
const app_1 = require("../../https/app");
const emailObjSend_1 = require("./emailObjSend");
const sendEmail = (email, id) => __awaiter(void 0, void 0, void 0, function* () {
    const generateQRCode = (url) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield qrcode_1.default.toDataURL(url);
        }
        catch (err) {
            console.error("Erro ao gerar QR code:", err);
            return null;
        }
    });
    const qrCodeUrl = `http://localhost:3000/webPage/${id}`;
    const qrCodeImage = yield generateQRCode(qrCodeUrl);
    console.log("qrCode:", qrCodeImage);
    const { html, subject, text } = (0, emailObjSend_1.emailContent)(qrCodeImage, id);
    try {
        //@ts-ignore
        yield app_1.app.mailer.sendMail({
            from: "Couple Diary <gabrielcarvalho1734@gmail.com>",
            to: email,
            subject,
            text,
            html,
        });
    }
    catch (error) {
        console.error("Failed to send email:", error);
    }
});
exports.sendEmail = sendEmail;
