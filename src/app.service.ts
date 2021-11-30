import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async editor() {
    return {
      user: 'test@mail.ru',
      blog: 'test',
      title: 'Добавить пост',
    };
  }
}
