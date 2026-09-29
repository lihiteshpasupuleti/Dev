import { Topic } from "../lib/api";

type WorkspaceProps = {
  topic: Topic;
  mastery: number;
  onStartQuiz: () => void;
};

export default function Workspace({ topic, mastery, onStartQuiz }: WorkspaceProps) {
  return (
    <div className="flex-1 p-6 bg-white dark:bg-black">
      <h2 className="text-2xl font-semibold mb-4">{topic.name}</h2>

      <div className="bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-200 rounded-md p-3 mb-3 text-sm">
        {topic.hook}
      </div>

      <div className="bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-200 rounded-md p-3 mb-4 text-sm">
        <p className="font-medium mb-1">Worked example</p>
        <p>{topic.example}</p>
      </div>

      <div className="flex gap-3 mb-5">
        <div className="flex-1 bg-zinc-50 dark:bg-zinc-900 rounded-md p-3">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
            Mastery score
          </p>
          <p className="text-xl font-semibold">
            {mastery}
            <span className="text-sm text-zinc-500">/100</span>
          </p>
        </div>
      </div>

      <button
        onClick={onStartQuiz}
        className="border border-blue-300 text-blue-700 dark:text-blue-300 dark:border-blue-700 rounded-full px-4 py-2 text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-950"
      >
        Start adaptive quiz →
      </button>
    </div>
  );
}