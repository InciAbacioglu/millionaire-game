import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import styles from "./Header.module.scss";

type Props = {
  userEmail?: string;
};

export default function Header({ userEmail }: Props) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <header className={styles.header}>
      <h1>💰 Millionaire Game</h1>

      <div className={styles.actions}>
        {userEmail ? (
          <>
            <span>Welcome, {userEmail}</span>
            <button onClick={() => router.push("/profile")}>Profile</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => router.push("/login")}>Login</button>
            <button
              onClick={() => router.push("/signup")}
              className={styles.signup}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
}
