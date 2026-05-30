import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Sanitize HTML to prevent injection
function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { name, email, message, subject, company } = req.body;

    // Honeypot anti-spam (if 'company' is filled, it's a bot)
    if (company) return res.status(200).end();

    if (!name || !email || !message || !subject) {
        return res.status(400).json({ error: "Missing fields" });
    }

    // Basic input length validation
    if (name.length > 200 || email.length > 200 || subject.length > 500 || message.length > 5000) {
        return res.status(400).json({ error: "Input too long" });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        // Sanitize all user inputs before inserting into HTML
        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeSubject = escapeHtml(subject);
        const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

        await transporter.sendMail({
            from: `"Website Contact" <${process.env.SMTP_EMAIL}>`,
            to: process.env.SMTP_EMAIL,
            replyTo: email,
            subject: `New Contact Form: ${safeName}`,
            html: `
        <h3>New Form Submission</h3>
        <p><b>Name:</b> ${safeName}</p>
        <p><b>Email:</b> ${safeEmail}</p>
        <p><b>Subject:</b> ${safeSubject}</p>
        <p><b>Message:</b><br>${safeMessage}</p>
      `,
        });

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Email failed" });
    }
}

