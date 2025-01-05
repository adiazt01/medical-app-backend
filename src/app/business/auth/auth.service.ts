import { Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor (
    private readonly mailerService: MailerService
  ) {}
  
  async create() {
    // console.log('Sending email...');
    // return await this.mailerService
    // .sendMail({
    //   to: 'armandodt2004@gmail.com', // list of receivers
    //   from: process.env.SMTP_FROM, // sender address
    //   subject: 'Testing Nest MailerModule ✔', // Subject line
    //   text: 'welcome', // plaintext body
    //   html: '<b>welcome</b>', // HTML body content
    // })
    // .then(() => {
    //   console.log('Email sent');
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // })
    
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
