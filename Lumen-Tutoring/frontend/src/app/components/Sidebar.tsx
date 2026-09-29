"use client";

import { useState } from "react";
import { Subject, Topic } from "../lib/api";

type SidebarProps = {
  subjects: Subject[];
  selectedTopic: Topic | null;
  onSelectTopic: (topic: Topic | null) => void;
};

export default function Sidebar({ subjects, selectedTopic, onSelectTopic }: SidebarProps) {
  const [activeSubject, setActiveSubject] = useState(subjects[0]?.name ?? "");
  const [openUnit, setOpenUnit] = useState<string | null>(
    subjects[0]?.units[0]?.name ?? null
  );

  const subject = subjects.find((s) => s.name === activeSubject);

  function handleSubjectClick(subjectName: string) {
    setActiveSubject(subjectName);
    const newSubject = subjects.find((s) => s.name === subjectName);
    if (newSubject && newSubject.units.length > 0) {
      setOpenUnit(newSubject.units[0].name);
      onSelectTopic(newSubject.units[0].topics[0]);
    } else {
      setOpenUnit(null);
      onSelectTopic(null);
    }
  }

  return (
    <div className="w-[210px] shrink-0 bg-zinc-50 dark:bg-zinc-900 p-4 border-r border-zinc-200 dark:border-zinc-800">
      <p className="text-sm font-medium mb-2">Subject</p>
      <div className="flex gap-2 mb-4">
        {subjects.map((s) => (
          <button
            key={s.name}
            onClick={() => handleSubjectClick(s.name)}
            className={`flex-1 text-sm py-1.5 rounded-md border ${
              activeSubject === s.name
                ? "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900 dark:text-blue-200"
                : "border-zinc-300 dark:border-zinc-700"
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {subject && subject.units.length > 0 ? (
        <>
          <p className="text-sm font-medium mb-2">Units</p>
          <div className="flex flex-col gap-1 text-sm">
            {subject.units.map((unit) => (
              <div key={unit.name}>
                <button
                  onClick={() =>
                    setOpenUnit(openUnit === unit.name ? null : unit.name)
                  }
                  className="w-full text-left px-2 py-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800"
                >
                  {openUnit === unit.name ? "▾" : "▸"} {unit.name}
                </button>
                {openUnit === unit.name && (
                  <div className="flex flex-col gap-1 mt-1">
                    {unit.topics.map((topic) => (
                      <button
                        key={topic.name}
                        onClick={() => onSelectTopic(topic)}
                        className={`text-left pl-6 py-1.5 rounded-md ${
                          selectedTopic?.name === topic.name
                            ? "text-blue-700 dark:text-blue-300 font-medium"
                            : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                        }`}
                      >
                        {topic.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Coming soon
        </p>
      )}
    </div>
  );
}