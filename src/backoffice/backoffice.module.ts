import { Module } from '@nestjs/common';
import { AdminModule } from '@admin-bro/nestjs';
import AdminBro from 'admin-bro';
import { Database, Resource } from '@admin-bro/typeorm';
import { User } from '../users/entities/user.entity';
import { Blog } from '../blogs/entities/blog.entity';
import { Post } from '../posts/entities/post.entity';

AdminBro.registerAdapter({ Database, Resource });

@Module({
  imports: [
    AdminModule.createAdmin({
      adminBroOptions: {
        rootPath: '/admin',
        resources: [User, Blog, Post],
      },
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class BackofficeModule {}
