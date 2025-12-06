export interface Question {
  id: number;
  text: string;
  options: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  category?: string;
  image?: string;
}
