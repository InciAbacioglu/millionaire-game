// components/AuthForm.tsx
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import Notification from "./Notification";

type Props = {
  mode: "login" | "signup";
};

export default function AuthForm({ mode }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      setNotification(error.message);
      setTimeout(() => setNotification(null), 2500);
    }
  };

  return (
    <div className="auth-form">
      <h2>{mode === "login" ? "Login" : "Sign Up"}</h2>
      {notification && <Notification message={notification} />}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </form>
    </div>
  );
}
