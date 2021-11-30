import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Render, Req,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    const post = await this.postsService.create(createPostDto);
    return post;
  }

  @Get()
  @Render('posts')
  async findAll() {
    const posts = await this.postsService.findAll();
    return { posts: posts, title: 'Список постов' };
  }

  @Get(':id')
  @Render('post')
  async findOne(@Param('id') id: string) {
    const post = await this.postsService.findById(+id, {
      order: { createdAt: 'DESC' },
      relations: ['user', 'blog'],
    });

    return { ...post };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/update')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const post = await this.postsService.update(+id, updatePostDto);
    return post;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.postsService.remove(+id);
    return deleted;
  }

  @UseGuards(JwtAuthGuard)
  @Post('like/:id')
  async addLike(@Param('id') id: string) {
    const post = await this.postsService.addLike(+id);
    return post;
  }

  @UseGuards(JwtAuthGuard)
  @Post('favorite/:id')
  async addFavorite(@Param('id') id: string, @Req() req: any) {
    const { userId } = req.user;
    const post = await this.postsService.addFavorite(+id, userId);
    return post;
  }
}
