export type Question = {
  text: string;
  options: string[];
  correctIndex: number;
};

export type Topic = {
  name: string;
  mastery: number;
  hook: string;
  example: string;
  questions: Question[];
};

export type Unit = {
  name: string;
  topics: Topic[];
};

export type Subject = {
  name: string;
  units: Unit[];
};

export type QuizResultPayload = {
  email: string;
  subject: string;
  unit_name: string;
  topic_name: string;
  correct: number;
  total: number;
};

export type ProgressEntry = {
  subject: string;
  unit: string;
  topic: string;
  mastery_score: number;
};

export async function fetchSubjects(): Promise<Subject[]> {
  const response = await fetch("http://127.0.0.1:8000/subjects");
  if (!response.ok) {
    throw new Error("Failed to fetch subjects");
  }
  return response.json();
}

export async function fetchProgress(email: string): Promise<ProgressEntry[]> {
  const response = await fetch(
    `http://127.0.0.1:8000/progress?email=${encodeURIComponent(email)}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch progress");
  }
  return response.json();
}

export async function saveQuizResult(result: QuizResultPayload) {
  const response = await fetch("http://127.0.0.1:8000/quiz-results", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result),
  });
  if (!response.ok) {
    throw new Error("Failed to save quiz result");
  }
  return response.json();
}