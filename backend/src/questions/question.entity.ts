import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column("text", { array: true }) // 4 opzioni
    options: string[];

    @Column()
    correctAnswer: string;

    @Column({ default: 'easy' })
    difficulty: string;

    @Column({ nullable: true })
    imageUrl?: string;
}
