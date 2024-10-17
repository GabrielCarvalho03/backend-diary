export const emailObjSend = {
  defaults: { from: " Couple Diary <gabrielcarvalho1734@gmail.com>" },
  transport: {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "gabrielcarvalho1734@gmail.com",
      pass: "gghp bdgd enhz tlut",
    },
  },
};

export const emailContent = (
  qrCodeImage: string | null,
  accessCode: string
) => {
  const subject = "Bem-vindo ao Couple Diary!";
  const text =
    "Olá, bem-vindo ao Couple Diary! Estamos felizes em tê-lo conosco.";
  const html = `
        <html>
          <body>
            <h1>Welcome to Couple Diary!</h1>
            <p>Hello, welcome to Couple Diary! We are happy to have you with us.</p>
             <p>Your access code is: <strong>${accessCode}</strong></p>
          <p>You can also use the link below to access your website:</p>
            <a href="http://localhost:3000/webPage/${accessCode}">Click here to access your website</a>
            <p>Yours sincerely,<br/>Couple Diary Team</p>
          </body>
        </html>
      `;

  return { subject, text, html };
};
