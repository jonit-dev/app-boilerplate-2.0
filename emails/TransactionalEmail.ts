import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import sgMail from '@sendgrid/mail';
import { readFileSync } from 'fs';
import moment from 'moment-timezone';
import * as path from 'path';

import { TextHelper } from '../libs/text.helper';
import { CustomLogger } from '../loggers/custom.logger';
import { LogRepository } from '../src/logs/logs.repository';
import { EnvTypes } from '../types/env.types';
import { emailProviders } from './email.providers';
import { EmailType, IEmailProvider } from './email.types';

@Injectable()
export class TransactionalEmail {
  private emailProviders: IEmailProvider[] = emailProviders;
  private logger = new CustomLogger('TransactionalEmail');
  private textHelper = new TextHelper();

  constructor(
    @InjectRepository(LogRepository)
    private logRepository: LogRepository,
  ) {
    // Setup email providers API Keys
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async send(
    to: string | undefined,
    subject: string,
    template: string,
    customVars: Record<string, unknown>,
    from: string = process.env.ADMIN_EMAIL,
  ): Promise<void> {
    switch (process.env.ENV) {
      case EnvTypes.Development:
      case EnvTypes.Staging:
        this.logger.log(
          'Skipping sending new account email... Option only available in production.',
        );
        break;

      case EnvTypes.Production:
        this.logger.log(`Sending email to ${to} - ${subject}`);

        const htmlEmail = this.loadTemplate(
          EmailType.Html,
          template,
          customVars,
        );
        const textEmail = this.loadTemplate(
          EmailType.Text,
          template,
          customVars,
        );

        await this.smartSend(to, from, subject, htmlEmail, textEmail);

        break;
    }
  }

  private async smartSend(
    to: string | undefined,
    from: string | undefined,
    subject: string,
    html: string,
    text: string,
  ): Promise<boolean> {
    const today = moment
      .tz(new Date(), process.env.TIMEZONE)
      .format('YYYY-MM-DD[T00:00:00.000Z]');

    // loop through email providers and check which one has an unmet free tier threshold.
    for (const emailProvider of this.emailProviders) {
      try {
        const providerEmailsToday = await this.logRepository.getLogsDate(
          new Date(today),
          `${emailProvider.key}_EMAIL_SUBMISSION`,
          'AFTER',
        );

        if (providerEmailsToday.length < emailProvider.credits) {
          this.logger.log(`Smart sending email to ${to} (from: ${from})`);

          this.logger.log(`Using ${emailProvider.key} to submit email...`);

          this.logger.log(
            `Credits balance today: ${providerEmailsToday.length}/${emailProvider.credits}`,
          );

          // Unsubscribed users: check if we should skip this user submission or not

          // const user = await User.findOne({ email: to });
          // const lead = await Lead.findOne({ email: to });

          // if (user?.unsubscribed === true || lead?.unsubscribed === true) {
          //   console.log(`Skipping email submission to unsubscribed user`);
          //   return true;
          // }

          // // insert unsubscribe link into [Unsubscribe Link] tag
          // let htmlWithUnsubscribeLink;

          // if (!to) {
          //   console.log('You should provide a valid "to" email');
          //   return false;
          // }

          // // here we encrypt the to email for security purposes
          // const encryptionHelper = new EncryptionHelper();
          // const encryptedEmail = encryptionHelper.encrypt(to);

          // htmlWithUnsubscribeLink = html.replace(
          //   '[Unsubscribe Link]',
          //   TS.string(null, 'unsubscribeLink', {
          //     unsubscribeUrl: `${process.env.API_URL}/unsubscribe?hashEmail=${encryptedEmail}&lang=${process.env.LANGUAGE}`,
          //   }),
          // );

          await emailProvider.emailSendingFunction(
            to,
            from,
            subject,
            html,
            text,
          );

          // register submission in our logs, so we can keep track of whats being sent

          await this.logRepository.createLog(
            `${emailProvider.key}_EMAIL_SUBMISSION`,
            from,
            to,
          );

          return true;
        }
      } catch (error) {
        console.log(`Failed to submit email through ${emailProvider.key}`);
        console.error(error);
        return false;
      }
    }

    // if we reach this point, it means that there's no providers with credits left!

    return false;
  }

  public loadTemplate(
    type: EmailType,
    template: string,
    customVars: Record<string, unknown>,
  ): string {
    let extension;

    if (type === EmailType.Html) {
      extension = '.html';
    } else if (type === EmailType.Text) {
      extension = '.txt';
    }

    const templatesPath = path.resolve(__dirname, '../../emails/templates');
    const individualTemplatePath = `${templatesPath}/${template}/content${extension}`;
    const data = readFileSync(individualTemplatePath, 'utf-8').toString();

    return this.replaceTemplateCustomVars(data, customVars);
  }

  private replaceTemplateCustomVars(
    html: string,
    customVars: Record<string, unknown>,
  ): string {
    const keys = Object.keys(customVars);

    const globalTemplateVars = {
      'Product Name': process.env.APP_NAME,
      'Sender Name': process.env.GLOBAL_VAR_SENDER_NAME,
      'Company Name, LLC': process.env.GLOBAL_VAR_COMPANY_NAME_LLC,
      'Company Address': process.env.GLOBAL_VAR_COMPANY_ADDRESS,
    };

    const globalKeys = Object.keys(globalTemplateVars);

    if (keys) {
      for (const key of keys) {
        html = this.textHelper.replaceAll(html, `{{${key}}}`, customVars[key]);
      }
    }

    if (globalKeys) {
      for (const globalKey of globalKeys) {
        html = this.textHelper.replaceAll(
          html,
          `[${globalKey}]`,
          globalTemplateVars[globalKey],
        );
      }
    }

    return html;
  }
}
