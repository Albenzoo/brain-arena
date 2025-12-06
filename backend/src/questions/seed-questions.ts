import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { QuestionsService } from './questions.service';
import type { CreateQuestionDto } from 'src/questions/dto/create-question.dto';

async function seedQuestions(): Promise<void> {
    const app = await NestFactory.createApplicationContext(AppModule);
    const questionsService = app.get(QuestionsService);

    // Array di 20 domande di esempio con correctAnswer come stringa
    const questions: CreateQuestionDto[] = [
        {
            text: "Which planet is closest to the Sun?",
            options: ["Venus", "Mercury", "Mars", "Earth"],
            correctAnswer: "Mercury",
            difficulty: "easy",
        },
        {
            text: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            correctAnswer: "Paris",
            difficulty: "easy",
        },
        {
            text: "Who wrote 'Romeo and Juliet'?",
            options: ["Shakespeare", "Dante", "Goethe", "Cervantes"],
            correctAnswer: "Shakespeare",
            difficulty: "easy",
        },
        {
            text: "What is the largest ocean on Earth?",
            options: ["Atlantic", "Indian", "Arctic", "Pacific"],
            correctAnswer: "Pacific",
            difficulty: "easy",
        },
        {
            text: "Which element has the chemical symbol 'O'?",
            options: ["Oxygen", "Gold", "Iron", "Silver"],
            correctAnswer: "Oxygen",
            difficulty: "easy",
        },
        {
            text: "What is the square root of 64?",
            options: ["6", "8", "7", "9"],
            correctAnswer: "8",
            difficulty: "easy",
        },
        {
            text: "Who painted the Mona Lisa?",
            options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Van Gogh"],
            correctAnswer: "Leonardo da Vinci",
            difficulty: "easy",
        },
        {
            text: "Which country is known as the Land of the Rising Sun?",
            options: ["China", "Japan", "Thailand", "South Korea"],
            correctAnswer: "Japan",
            difficulty: "easy",
        },
        {
            text: "What is the hardest natural substance?",
            options: ["Gold", "Diamond", "Iron", "Quartz"],
            correctAnswer: "Diamond",
            difficulty: "easy",
        },
        {
            text: "Which gas do plants absorb from the atmosphere?",
            options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
            correctAnswer: "Carbon Dioxide",
            difficulty: "easy",
        },
        {
            text: "What is the capital of Australia?",
            options: ["Sydney", "Melbourne", "Canberra", "Perth"],
            correctAnswer: "Canberra",
            difficulty: "medium",
        },
        {
            text: "Who discovered penicillin?",
            options: ["Marie Curie", "Alexander Fleming", "Louis Pasteur", "Isaac Newton"],
            correctAnswer: "Alexander Fleming",
            difficulty: "medium",
        },
        {
            text: "What is the smallest prime number?",
            options: ["1", "2", "3", "5"],
            correctAnswer: "2",
            difficulty: "medium",
        },
        {
            text: "Which planet has the most moons?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            correctAnswer: "Saturn",
            difficulty: "medium",
        },
        {
            text: "What is the chemical formula for table salt?",
            options: ["NaCl", "KCl", "CaCO3", "H2O"],
            correctAnswer: "NaCl",
            difficulty: "medium",
        },
        {
            text: "Who is known as the father of computers?",
            options: ["Alan Turing", "Charles Babbage", "Bill Gates", "Steve Jobs"],
            correctAnswer: "Charles Babbage",
            difficulty: "medium",
        },
        {
            text: "Which year did World War II end?",
            options: ["1942", "1945", "1948", "1950"],
            correctAnswer: "1945",
            difficulty: "medium",
        },
        {
            text: "What is the largest desert in the world?",
            options: ["Sahara", "Gobi", "Antarctic", "Arabian"],
            correctAnswer: "Antarctic",
            difficulty: "hard",
        },
        {
            text: "Who developed the theory of relativity?",
            options: ["Newton", "Einstein", "Galileo", "Tesla"],
            correctAnswer: "Einstein",
            difficulty: "hard",
        },
        {
            text: "Which language has the most native speakers?",
            options: ["English", "Mandarin", "Spanish", "Hindi"],
            correctAnswer: "Mandarin",
            difficulty: "hard",
        },
    ];

    for (const q of questions) {
        try {
            await questionsService.create(q);
            console.log(`Inserted: ${q.text}`);
        } catch (error) {
            console.error(`Error inserting question: ${q.text}`, error);
        }
    }

    await app.close();
}

seedQuestions();