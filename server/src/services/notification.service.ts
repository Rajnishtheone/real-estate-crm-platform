import nodemailer from 'nodemailer';
import { Lead, Property } from '@prisma/client';
import { env } from '../config/env';

// Placeholder WhatsApp sender
const sendWhatsApp = async (to: string, message: string) => {
  if (!env.WHATSAPP_API_URL) return;
  console.log('Sending WhatsApp to', to, message);
};

export const NotificationService = {
  async leadCreated(lead: Lead, property: Property) {
    const subject = `New lead for ${property.title}`;
    const text = `Lead ${lead.name} is interested in ${property.title}. Message: ${lead.message || ''}`;
    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    });
    await transporter.sendMail({
      from: env.SMTP_FROM || 'no-reply@realestate.com',
      to: env.SALES_EMAIL || 'sales@example.com',
      subject,
      text,
    });
    if (lead.phone) await sendWhatsApp(lead.phone, text);
  },
};
