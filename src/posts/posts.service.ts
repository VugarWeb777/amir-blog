import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import {FindManyOptions, FindOneOptions, Repository} from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UsersService } from '../users/users.service';
import { BlogsService } from '../blogs/blogs.service';
import { PostFavorite } from './entities/post-favorite.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
    @InjectRepository(PostFavorite)
    private readonly postsFavoriteRepository: Repository<PostFavorite>,
    private readonly usersService: UsersService,
    private readonly blogsService: BlogsService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const user = await this.usersService.findById(+createPostDto.userId);
    const blog = await this.blogsService.findById(+createPostDto.blogId);
    const post = {
      title: createPostDto.title,
      content: createPostDto.content,
      user,
      blog,
    };

    return this.postsRepository.save(post);
  }

  findAll(options?: FindManyOptions<Post>): Promise<Post[]> {
    return this.postsRepository.find(options);
  }

  findOne(id: number) {
    return this.postsRepository.findOne(id, {
      relations: ['user', 'blog'],
    });
  }

  async findById(id: number, options?: FindOneOptions<Post>): Promise<Post> {
    return this.postsRepository.findOne(id, options);
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const user = await this.usersService.findById(+updatePostDto.userId);
    const blog = await this.blogsService.findById(+updatePostDto.blogId);
    const post = {
      title: updatePostDto.title,
      content: updatePostDto.content,
      user,
      blog,
    };
    return this.postsRepository.update(id, post);
  }

  remove(id: number) {
    return this.postsRepository.delete(id);
  }

  async addLike(id: number) {
    const post = await this.postsRepository.findOne(id);
    post.liked = ++post.liked;
    const postUpdated = this.postsRepository.update(id, post);
    return postUpdated;
  }

  async addFavorite(id: number, userId: number) {
    const post = await this.postsRepository.findOne(id);

    if (!post) {
      throw new BadRequestException('invalid postId');
    }

    const user = await this.usersService.findById(userId);

    const favoritePost = await this.postsFavoriteRepository.findOne({
      where: { post: post, user: user },
    });

    if (!favoritePost) {
      const favorite = this.postsFavoriteRepository.create({
        user,
        post: post,
      });

      await this.postsFavoriteRepository.save(favorite);

      return { success: true };
    }

    return { success: false };
  }
}
