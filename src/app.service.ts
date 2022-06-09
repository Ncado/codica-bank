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


}
