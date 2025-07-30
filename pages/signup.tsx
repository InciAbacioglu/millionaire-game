import { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import Notification from "../components/Notification";

import styles from "../styles/SignupPage.module.scss";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err: any) {
      setNotification(err.message);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <h2 className={styles.title}>Create Account</h2>
      {notification && <Notification message={notification} />}
      <form onSubmit={handleSignup} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
