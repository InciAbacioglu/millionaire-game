import { useEffect, useState } from "react";
import styles from "./Timer.module.scss";

type Props = {
  duration: number;
  onTimeUp: () => void;
  resetTrigger: number;
};

export default function Timer({ duration, onTimeUp, resetTrigger }: Props) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [resetTrigger]);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return <div className={styles.timer}>⏳ Time Left: {timeLeft}s</div>;
}
