import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UploadModule, MailModule, ConfigModule],
  providers: [],
})
export class CommonModule {}
