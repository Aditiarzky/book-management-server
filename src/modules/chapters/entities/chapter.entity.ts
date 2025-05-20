import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Book } from '../../books/entities/book.entity';

@Entity()
export class Chapter {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, (book) => book.chapters)
  book: Book;

  @Column()
  chapter: number;

  @Column({ nullable: true })
  volume: number;

  @Column({ length: 50 })
  nama: string;

  @Column({ length: 255, nullable: true })
  thumbnail: string;

  @Column({ type: 'text', nullable: true })
  isigambar: string;

  @Column({ type: 'text', nullable: true })
  istext: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}