import styles from "./JokerPanel.module.scss";

type Props = {
  correctAnswer: string;
  allAnswers: string[];
  onFiftyFifty: () => void;
  onAudience: () => void;
  onPhone: () => void;
};

export default function JokerPanel({
  onFiftyFifty,
  onAudience,
  onPhone,
}: Props) {
  return (
    <div className={styles.jokerPanel}>
      <button
        onClick={onFiftyFifty}
        className={`${styles.jokerButton} ${styles.fifty}`}
      >
        🎲 50:50
      </button>
      <button
        onClick={onAudience}
        className={`${styles.jokerButton} ${styles.audience}`}
      >
        👥 Audience
      </button>
      <button
        onClick={onPhone}
        className={`${styles.jokerButton} ${styles.phone}`}
      >
        ☎ Phone
      </button>
    </div>
  );
}
