"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-sm p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg">
        <h1 className="text-xl font-semibold mb-1">
          {mode === "login" ? "Log in" : "Create an account"}
        </h1>
        <p className="text-sm text-zinc-500 mb-4">Accel Academy</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-zinc-300 dark:border-zinc-700 rounded-md px-3 py-2 text-sm bg-white dark:bg-zinc-900"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="border border-zinc-300 dark:border-zinc-700 rounded-md px-3 py-2 text-sm bg-white dark:bg-zinc-900"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 disabled:bg-zinc-400 text-white rounded-md py-2 text-sm font-medium"
          >
            {loading ? "Please wait..." : mode === "login" ? "Log in" : "Sign up"}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="text-sm text-blue-700 dark:text-blue-300 mt-4"
        >
          {mode === "login"
            ? "Don't have an account? Sign up"
            : "Already have an account? Log in"}
        </button>
      </div>
    </div>
  );
}