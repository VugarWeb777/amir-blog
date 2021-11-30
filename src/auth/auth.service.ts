import { HttpService, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BlogsService } from '../blogs/blogs.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
    private readonly blogsService: BlogsService,
  ) {}

  async getProfile(token: string, x_sign: string) {
    const response = await this.httpService
      .get(`https://account.amir.capital/account/v2/me`, {
        headers: {
          authorization: `Bearer ${token}`,
          'x-sign': x_sign,
        },
      })
      .toPromise();

    const profile = response.data;
    let user = await this.usersService.findByEmail(profile.data.email, {
      relations: ['blog', 'posts', 'favorites'],
    });

    const { blog, posts, favorites } = user;

    if (!user) {
      const blog = await this.blogsService.create({
        title: `${profile.data.name} blog`,
        description: 'my first blog',
      });
      user = await this.usersService.create({
        status: profile.data.last_status,
        ...profile.data,
        blog,
      });
    }

    return {
      user,
      blog,
      posts,
      favorites,
      access_blog_token: this.jwtService.sign({ ...user }),
    };
  }
}
