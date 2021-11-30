import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  BaseEntity,
  RelationId,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Post } from './post.entity';

@Entity()
export class PostFavorite extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, (post) => post.favorites)
  post: Post;

  @RelationId((postFavorite: PostFavorite) => postFavorite.post)
  postId: number;

  @ManyToOne(() => User, (user) => user.favorites)
  user: User;

  @RelationId((postFavorite: PostFavorite) => postFavorite.user)
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
