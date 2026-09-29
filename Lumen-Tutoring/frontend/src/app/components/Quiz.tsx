"use client";

import { useState } from "react";
import { Topic } from "../lib/api";

type QuizProps = {
  topic: Topic;
  onExit: () => void;
  onComplete: (correct: number, total: number) => void;
};

export default function Quiz({ topic, onExit, onComplete }: QuizProps) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const questions = topic.questions;

  if (questions.length === 0) {
    return (
      <div className="flex-1 p-6">
        <p className="text-zinc-500 mb-4">
          No quiz questions for this topic yet.
        </p>
        <button
          onClick={onExit}
          className="text-blue-700 dark:text-blue-300 text-sm font-medium"
        >
          ← Back to lesson
        </button>
      </div>
    );
  }

  const question = questions[index];
  const isLastQuestion = index === questions.length - 1;
  const isFinished = checked && isLastQuestion;

  function handleCheck() {
    if (selected === null) return;
    setChecked(true);

    const isCorrect = selected === question.correctIndex;
    if (isCorrect) {
      setCorrectCount((c) => c + 1);
    }

    if (isLastQuestion) {
      onComplete(correctCount + (isCorrect ? 1 : 0), questions.length);
    }
  }

  function handleNext() {
    setIndex((i) => i + 1);
    setSelected(null);
    setChecked(false);
  }

  return (
    <div className="flex-1 p-6 max-w-xl">
      <button
        onClick={onExit}
        className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 mb-4"
      >
        ← Back to lesson
      </button>

      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
        {topic.name} · Question {index + 1} of {questions.length}
      </p>

      {!isFinished ? (
        <>
          <h2 className="text-xl font-semibold mb-4">{question.text}</h2>

          <div className="flex flex-col gap-2 mb-4">
            {question.options.map((option, i) => {
              const isCorrect = checked && i === question.correctIndex;
              const isWrongSelected =
                checked && selected === i && i !== question.correctIndex;

              return (
                <button
                  key={option}
                  disabled={checked}
                  onClick={() => setSelected(i)}
                  className={`text-left px-4 py-2 rounded-md border text-sm ${
                    isCorrect
                      ? "border-green-400 bg-green-50 dark:bg-green-950 text-green-800 dark:text-green-200"
                      : isWrongSelected
                      ? "border-red-400 bg-red-50 dark:bg-red-950 text-red-800 dark:text-red-200"
                      : selected === i
                      ? "border-blue-400 bg-blue-50 dark:bg-blue-950"
                      : "border-zinc-300 dark:border-zinc-700"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {!checked ? (
            <button
              onClick={handleCheck}
              disabled={selected === null}
              className="bg-blue-600 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 text-white rounded-full px-4 py-2 text-sm font-medium"
            >
              Check answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-blue-600 text-white rounded-full px-4 py-2 text-sm font-medium"
            >
              Next question →
            </button>
          )}
        </>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-2">Quiz complete!</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            You got {correctCount} out of {questions.length} correct.
          </p>
          <button
            onClick={onExit}
            className="bg-blue-600 text-white rounded-full px-4 py-2 text-sm font-medium"
          >
            Back to lesson
          </button>
        </div>
      )}
    </div>
  );
}