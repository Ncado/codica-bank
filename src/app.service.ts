import { Injectable } from '@nestjs/common';
import { env } from 'process';

const shortid = require('shortid')
@Injectable()
export class AppService {

  constructor() {

  }

  getHello(): string {
    return 'Hejbjhjvgllo World!';
  }

  // async generateHook(email:string) {
  //   const unicIdentifer = shortid.generate();
  //   const payload = {email: email, id: unicIdentifer}
  //   const token =  await this.jwtService.sign(payload);
  //   return process.env.HOST+":"+process.env.PORT+"/"+"transaction"+"/"+unicIdentifer+"/?apiKey="+token;
  // }
}
