import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog) private readonly blogsRepository: Repository<Blog>,
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    return this.blogsRepository.save(createBlogDto);
  }

  findAll() {
    return this.blogsRepository.find();
  }

  findOne(id: number) {
    return this.blogsRepository.findOne(id);
  }

  async findById(id: number, options?: FindOneOptions<Blog>): Promise<Blog> {
    return this.blogsRepository.findOne(id, options);
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return this.blogsRepository.update(id, updateBlogDto);
  }

  remove(id: number) {
    return this.blogsRepository.delete(id);
  }
}
