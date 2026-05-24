"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignIn(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setNote("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }
    // The home page decides where to send them (onboarding or dashboard).
    router.push("/");
    router.refresh();
  }

  async function handleSignUp() {
    if (!email || !password) {
      setError("Enter an email and password first.");
      return;
    }
    setLoading(true);
    setError("");
    setNote("");

    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }
    setNote("Account created — now tap Sign in to continue.");
  }

  return (
    <div className="container">
      <div className="center" style={{ marginBottom: 24 }}>
        <h1>Pugsie PA</h1>
        <p className="muted">Jobs, invoices and payments — sorted.</p>
      </div>

      <div className="card">
        <h2>Sign in</h2>
        <form onSubmit={handleSignIn}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Working…" : "Sign in"}
          </button>
        </form>

        <button
          type="button"
          className="secondary"
          onClick={handleSignUp}
          disabled={loading}
        >
          Create a new account
        </button>

        {error && <p className="error">{error}</p>}
        {note && <p className="note" style={{ color: "var(--ok)" }}>{note}</p>}
      </div>
    </div>
  );
}
