import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { QuestionPublicDto } from './dto/question-public.dto';
import { QuestionsService } from './questions.service';
import type { CreateQuestionDto } from 'src/questions/dto/create-question.dto';
import { Question } from './question.entity';
import type { CheckAnswerDto } from 'src/questions/dto/check-answer.dto';

@Controller('questions')
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) { }

    @Get()
    async getAll(): Promise<QuestionPublicDto[]> {
        return this.questionsService.findAll();
    }

    /**
     * Returns a random question (public DTO, no correct answer).
     */
    @Get('random')
    async getRandom(): Promise<QuestionPublicDto> {
        return await this.questionsService.getRandom();
    }

    @Post()
    async create(@Body() createDto: CreateQuestionDto): Promise<Question> {
        return await this.questionsService.create(createDto);
    }

    @Post('check')
    async checkAnswer(@Body() dto: CheckAnswerDto): Promise<{ isCorrect: boolean }> {
        try {
            return await this.questionsService.checkAnswer(dto);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
