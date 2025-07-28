import { useRouter } from "next/router";
import styles from "./GameOver.module.scss";

type Props = {
  earned: string;
  reason: "timeout" | "wrong";
};

export default function GameOver({ earned, reason }: Props) {
  const router = useRouter();

  const getMessage = () => {
    if (reason === "timeout") {
      return {
        title: "⏰ Time's Up!",
        detail: "You ran out of time.",
      };
    }
    return {
      title: "🛑 Game Over",
      detail: "You gave 3 wrong answers.",
    };
  };

  const { title, detail } = getMessage();

  return (
    <div className={styles.gameOverContainer}>
      <h1>{title}</h1>
      <p>{detail}</p>
      <h2>
        💰 You Earned: <span>{earned}</span>
      </h2>
      <button onClick={() => router.reload()} className={styles.playAgain}>
        🔁 Play Again
      </button>
    </div>
  );
}
