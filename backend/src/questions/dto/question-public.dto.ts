export interface QuestionPublicDto {
    id: number;
    text: string;
    options: string[];
    difficulty: string;
    imageUrl?: string;
    // correctAnswer intentionally omitted for security
}