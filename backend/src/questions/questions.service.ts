import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { Repository } from 'typeorm';
import { QuestionPublicDto } from './dto/question-public.dto';
import { CreateQuestionDto } from 'src/questions/dto/create-question.dto';
import { CheckAnswerDto } from 'src/questions/dto/check-answer.dto';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(Question)
        private readonly questionRepo: Repository<Question>,
    ) { }

    async findAll(): Promise<QuestionPublicDto[]> {
        const questions = await this.questionRepo.find();
        // Mappa le domande per non esporre la risposta corretta
        return questions.map(q => ({
            id: q.id,
            text: q.text,
            options: q.options,
            difficulty: q.difficulty,
            imageUrl: q.imageUrl,
        }));
    }


    async create(createDto: CreateQuestionDto): Promise<Question> {
        // Validazione base: 4 opzioni, indice corretto valido
        if (
            !createDto.options ||
            createDto.options.length !== 4 ||
            !createDto.correctAnswer
        ) {
            throw new Error('Invalid question data');
        }
        const question = this.questionRepo.create(createDto);
        return await this.questionRepo.save(question);
    }

    async checkAnswer(dto: CheckAnswerDto): Promise<{ isCorrect: boolean }> {
        const question = await this.questionRepo.findOne({ where: { id: dto.questionId } });
        if (!question) {
            throw new Error('Question not found');
        }
        // Confronta la risposta scelta con quella corretta
        return { isCorrect: dto.selectedAnswer === question.correctAnswer };
    }


    /**
     * Returns a random question from the database, mapped to the public DTO.
     */
    async getRandom(): Promise<QuestionPublicDto> {
        // Get the total number of questions
        const count = await this.questionRepo.count();
        if (count === 0) {
            throw new Error('No questions available');
        }
        // Generate a random offset
        const randomOffset = Math.floor(Math.random() * count);
        // Retrieve one question with the random offset
        const [question] = await this.questionRepo.find({
            skip: randomOffset,
            take: 1,
        });
        // Map to public DTO (do not expose correctAnswer)
        return {
            id: question.id,
            text: question.text,
            options: question.options,
            difficulty: question.difficulty,
            imageUrl: question.imageUrl,
        };
    }
}
