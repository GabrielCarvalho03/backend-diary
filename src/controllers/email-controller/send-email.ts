import QRCode from "qrcode";
import { app } from "../../https/app";
import { emailContent } from "./emailObjSend";

export const sendEmail = async (email: string, id: string) => {
  const generateQRCode = async (url: string) => {
    try {
      return await QRCode.toDataURL(url);
    } catch (err) {
      console.error("Erro ao gerar QR code:", err);
      return null;
    }
  };

  const qrCodeUrl = `http://localhost:3000/webPage/${id}`;
  const qrCodeImage = await generateQRCode(qrCodeUrl);
  console.log("qrCode:", qrCodeImage);

  const { html, subject, text } = emailContent(qrCodeImage, id);

  try {
    //@ts-ignore
    await app.mailer.sendMail({
      from: "Couple Diary <gabrielcarvalho1734@gmail.com>",
      to: email,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};
