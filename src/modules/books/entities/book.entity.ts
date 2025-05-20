import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Genre } from '../../genres/entities/genre.entity';
import { Chapter } from '../../chapters/entities/chapter.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Genre, (genre) => genre.books)
  genre: Genre;

  @Column({ length: 255 })
  judul: string;

  @Column({ length: 255 })
  alur: string;

  @Column({ length: 255 })
  cover: string;

  @Column({ length: 255 })
  author: string;

  @Column({ type: 'text' })
  synopsis: string;

  @Column({ length: 255 })
  status: string;

  @Column({ length: 255 })
  type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Chapter, (chapter) => chapter.book)
  chapters: Chapter[];
}