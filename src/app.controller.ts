import { Controller, Get, InternalServerErrorException } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/test-error')
  testError() {
    throw new InternalServerErrorException('This is a test error to verify global error logging.');
  }
}
