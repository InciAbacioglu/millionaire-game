import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import Notification from "../components/Notification";
import { useRouter } from "next/router"; // ✅ yönlendirme için

import styles from "../styles/LoginPage.module.scss";

export default function LoginPage() {
  const router = useRouter(); // ✅ router kur
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }

      // ✅ Giriş veya kayıt başarılı → yönlendir
      router.push("/");
    } catch (err: any) {
      setNotification(err.message);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className={styles.container}>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>

      {notification && <Notification message={notification} />}

      <form onSubmit={handleSubmit}>
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
        <button type="submit">{isLogin ? "Login" : "Create Account"}</button>
      </form>

      <p className={styles.toggleText}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Sign Up" : "Login"}
        </span>
      </p>
    </div>
  );
}
