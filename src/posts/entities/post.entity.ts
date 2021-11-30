import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Blog } from '../../blogs/entities/blog.entity';
import { PostFavorite } from './post-favorite.entity';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  content: string;

  @Column({
    default: false,
  })
  isPublished: boolean;

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @OneToMany(() => Post, (favorite) => favorite.user)
  favorites: PostFavorite[];

  @Column({
    default: 0,
  })
  liked: number;

  @Column({
    default: 0,
  })
  saved: number;

  @ManyToOne(() => Blog, (blog) => blog.posts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  blog: Blog;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
