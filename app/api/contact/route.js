import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            console.error('Name, email and message are required');
            return new Response('Name, email and message are required', { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: "hello@jestorm.co.ke",
            to: "tomsteve187@gmail.com",
            subject: 'Contact Form Chuka Marketplace',
            html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <div style="background-color: #f4f4f4; padding: 20px; text-align: center;">
                        <h1 style="margin: 0; color: #333;">Message from ${name}</h1>
                    </div>
                    <div style="padding: 20px;">
                        <p style="margin: 0; padding: 10px; border-bottom: 1px solid #ddd;">
                            <strong>Email:</strong> ${email}
                        </p>
                        <p style="margin: 0; padding: 10px; border-bottom: 1px solid #ddd;">
                            <strong>Message:</strong> ${message}
                        </p>
                    </div>
                </div>
            `,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return new Response('Email sent successfully', { status: 200 });
    } catch (e) {
        console.error(e);
        return new Response('Error sending email: ' + e.message, { status: 400 });
    }
}