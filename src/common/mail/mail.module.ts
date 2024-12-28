import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
    imports: [
        MailerModule.forRoot({
            defaults: {
                from: process.env.SMTP_FROM,
            },
            transport: {
                host: process.env.SMTP_HOST,
                port: 465,
                secure: true,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD,
                },
            },
            template: {
                dir: __dirname + '/templates',
                adapter: new PugAdapter(),
                options: {
                    strict: true
                }
            },
        })
    ],
})
export class MailModule { }
