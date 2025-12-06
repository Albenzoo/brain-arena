export interface CreateQuestionDto {
  text: string;
  options: string[];
  correctAnswer: string;
  difficulty: string;
  imageUrl?: string;
}