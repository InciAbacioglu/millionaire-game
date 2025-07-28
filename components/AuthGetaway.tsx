import { useState } from "react";
import AuthForm from "./AuthForm";

export default function AuthGateway() {
  const [mode, setMode] = useState<"login" | "signup" | null>(null);

  if (mode) {
    return <AuthForm mode={mode} />;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Welcome to Millionaire Game</h2>
      <p>Choose an option to continue</p>
      <button
        style={{ margin: "10px", padding: "10px 20px" }}
        onClick={() => setMode("login")}
      >
        Login
      </button>
      <button
        style={{ margin: "10px", padding: "10px 20px" }}
        onClick={() => setMode("signup")}
      >
        Sign Up
      </button>
    </div>
  );
}
