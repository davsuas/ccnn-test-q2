
export type QuestionType = 'opción múltiple' | 'completar espacio' | 'verdadero/falso';

export interface Question {
  id: number;
  tema: string;
  tipo_pregunta: QuestionType;
  pregunta: string;
  opciones?: string[];
  respuesta_correcta: string;
}

export type GameStatus = 'welcome' | 'playing' | 'feedback' | 'finished';

export interface GameState {
  currentQuestions: Question[];
  currentIndex: number;
  score: number;
  usedIds: number[];
  status: GameStatus;
  lastAnswerCorrect: boolean | null;
  selectedAnswer: string | null;
}
