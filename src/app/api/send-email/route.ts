import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { sender, receiver, subject, content } = await req.json();

  const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 1025,
    secure: false, // MailHog does not support SSL
  });

  const mailOptions = {
    from: sender,
    to: receiver,
    subject: subject,
    text: content,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: `Failed to send email: ${error.message}`,
        status: 500,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return new Response(
    JSON.stringify({
      message: `Email sent from ${sender} to ${receiver}`,
      status: 200,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
