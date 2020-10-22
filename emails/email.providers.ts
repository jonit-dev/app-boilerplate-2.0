import sgMail from '@sendgrid/mail';

import { EmailProviders, IEmailProvider } from './email.types';

export const emailProviders: IEmailProvider[] = [
  {
    // TODO: SENDGRID Free tier is 100 only
    key: EmailProviders.SENDGRID,
    credits: 100,
    emailSendingFunction: async (
      to,
      from,
      subject,
      html,
      text,
    ): Promise<void> => {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      sgMail.send({
        to,
        from: {
          email: from,
          name: process.env.APP_NAME,
        },
        subject,
        html,
        text,
      });
    },
  },
];
