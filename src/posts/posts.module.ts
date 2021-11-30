import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UsersModule } from '../users/users.module';
import { BlogsModule } from '../blogs/blogs.module';
import { PostFavorite } from './entities/post-favorite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, PostFavorite]),
    UsersModule,
    BlogsModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
