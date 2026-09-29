"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Workspace from "./components/Workspace";
import Quiz from "./components/Quiz";
import {
  fetchSubjects,
  fetchProgress,
  saveQuizResult,
  Subject,
  Topic,
  ProgressEntry,
} from "./lib/api";
import { useUser } from "./lib/useUser";
import { supabase } from "./lib/supabase";

export default function Home() {
  const router = useRouter();
  const { user, loading: userLoading } = useUser();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/login");
    }
  }, [userLoading, user, router]);

    useEffect(() => {
    if (!user?.email) return;

    fetchSubjects()
      .then((data) => {
        setSubjects(data);
        const firstTopic = data[0]?.units[0]?.topics[0] ?? null;
        setSelectedTopic(firstTopic);
      })
      .catch(() => setLoadError(true));

    fetchProgress(user.email)
      .then(setProgress)
      .catch((err) => console.error("Could not load progress", err));
  }, [user]);

  function handleSelectTopic(topic: Topic | null) {
    setSelectedTopic(topic);
    setShowQuiz(false);
  }

  function locateTopic(topic: Topic) {
    for (const subject of subjects) {
      for (const unit of subject.units) {
        if (unit.topics.includes(topic)) {
          return { subjectName: subject.name, unitName: unit.name };
        }
      }
    }
    return null;
  }

  function getMastery(topic: Topic): number {
    const location = locateTopic(topic);
    const saved = progress.find(
      (p) => p.subject === location?.subjectName && p.topic === topic.name
    );
    return saved ? saved.mastery_score : topic.mastery;
  }

    function handleQuizComplete(correct: number, total: number) {
    if (!selectedTopic || !user?.email) return;
    const location = locateTopic(selectedTopic);
    if (!location) return;

    saveQuizResult({
      email: user.email,
      subject: location.subjectName,
      unit_name: location.unitName,
      topic_name: selectedTopic.name,
      correct,
      total,
    })
      .then(() => fetchProgress(user.email!))
      .then(setProgress)
      .catch((err) => console.error("Could not save quiz result", err));
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (userLoading || !user) {
    return <div className="p-6 text-zinc-500">Loading...</div>;
  }

  if (loadError) {
    return (
      <div className="p-6">
        <p className="text-red-600">
          Couldn&apos;t reach the backend. Make sure it&apos;s running at
          http://127.0.0.1:8000.
        </p>
      </div>
    );
  }

  if (subjects.length === 0) {
    return <div className="p-6 text-zinc-500">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header onLogout={handleLogout} />
      <div className="flex flex-1">
        <Sidebar
          subjects={subjects}
          selectedTopic={selectedTopic}
          onSelectTopic={handleSelectTopic}
        />
        {selectedTopic === null ? (
          <div className="flex-1 p-6">
            <p className="text-zinc-500 dark:text-zinc-400">
              This subject is coming soon.
            </p>
          </div>
        ) : showQuiz ? (
          <Quiz
            topic={selectedTopic}
            onExit={() => setShowQuiz(false)}
            onComplete={handleQuizComplete}
          />
        ) : (
          <Workspace
            topic={selectedTopic}
            mastery={getMastery(selectedTopic)}
            onStartQuiz={() => setShowQuiz(true)}
          />
        )}
      </div>
    </div>
  );
}