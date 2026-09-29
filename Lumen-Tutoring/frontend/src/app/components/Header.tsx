import Image from "next/image";

type HeaderProps = {
  onLogout: () => void;
};

export default function Header({ onLogout }: HeaderProps) {
  return (
    <header className="flex items-center justify-between gap-2 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="Accel Academy logo" width={28} height={28} />
        <span className="font-bold tracking-tight text-sm">
          ACCEL <span className="text-blue-600 dark:text-blue-400">ACADEMY</span>
        </span>
      </div>
      <button
        onClick={onLogout}
        className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
      >
        Log out
      </button>
    </header>
  );
}