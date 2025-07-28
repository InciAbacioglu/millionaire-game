import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";

import Timer from "../components/Timer";
import QuestionCard from "../components/QuestionCard";
import JokerPanel from "../components/JokerPanel";
import MoneyLadder from "../components/MoneyLadder";
import Notification from "../components/Notification";
import Finish from "../components/endgame/Finish";
import GameOver from "../components/endgame/GameOver";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

import styles from "../styles/index.module.scss";

type Question = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  difficulty: "easy" | "medium" | "hard";
};

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const [visibleAnswers, setVisibleAnswers] = useState<string[]>([]);
  const [timerReset, setTimerReset] = useState(0);
  const [notification, setNotification] = useState<string | null>(null);

  const [usedFifty, setUsedFifty] = useState(false);
  const [usedAudience, setUsedAudience] = useState(false);
  const [usedPhone, setUsedPhone] = useState(false);

  const [wrongCount, setWrongCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverReason, setGameOverReason] = useState<"timeout" | "wrong">(
    "wrong"
  );

  const moneyList = [
    "$100",
    "$200",
    "$300",
    "$500",
    "$1,000",
    "$2,000",
    "$4,000",
    "$8,000",
    "$16,000",
    "$32,000",
    "$64,000",
    "$125,000",
    "$250,000",
    "$500,000",
    "$1,000,000",
    "$1,500,000",
    "$2,000,000",
    "$3,000,000",
  ];
  const [earned, setEarned] = useState("$0");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      const difficulties = ["easy", "medium", "hard"];
      const all: Question[] = [];

      for (const diff of difficulties) {
        const res = await fetch(
          `https://opentdb.com/api.php?amount=6&difficulty=${diff}&type=multiple`
        );
        const data = await res.json();
        if (data?.results?.length > 0) all.push(...data.results);
      }

      setQuestions(all);
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex < 18) {
      const current = questions[currentQuestionIndex];
      const answers = [current.correct_answer, ...current.incorrect_answers];
      const shuffled = answers.sort(() => Math.random() - 0.5);
      setShuffledAnswers(shuffled);
      setVisibleAnswers(shuffled);
    }

    setEarned(moneyList[currentQuestionIndex - 1] || "$0");
  }, [questions, currentQuestionIndex]);

  const showNotification = (msg: string, duration = 2000) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), duration);
  };

  const handleAnswerClick = (answer: string) => {
    const correct = questions[currentQuestionIndex].correct_answer;
    if (answer === correct) {
      showNotification("✅ Correct!", 1500);
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimerReset((prev) => prev + 1);
    } else {
      const updated = wrongCount + 1;
      showNotification(`❌ Wrong! Remaining chances: ${3 - updated}`, 2000);
      setWrongCount(updated);
      if (updated >= 3) {
        setGameOverReason("wrong");
        setGameOver(true);
      }
    }
  };

  const handleTimeUp = () => {
    showNotification("⏰ Time's up!");
    setGameOverReason("timeout");
    setGameOver(true);
  };

  const handleFiftyFifty = () => {
    if (usedFifty) return;
    setUsedFifty(true);
    const current = questions[currentQuestionIndex];
    const incorrect = current.incorrect_answers;
    const keptWrong = incorrect[Math.floor(Math.random() * incorrect.length)];
    const reduced = [current.correct_answer, keptWrong].sort(
      () => Math.random() - 0.5
    );
    setVisibleAnswers(reduced);
  };

  const handleAudience = () => {
    if (usedAudience) return;
    setUsedAudience(true);
    alert(
      "👥 Audience suggests: " + questions[currentQuestionIndex].correct_answer
    );
  };

  const handlePhone = () => {
    if (usedPhone) return;
    setUsedPhone(true);
    const current = questions[currentQuestionIndex];
    const chance = Math.random();
    const suggestion =
      chance < 0.8
        ? current.correct_answer
        : current.incorrect_answers[Math.floor(Math.random() * 3)];
    alert("☎ Phone friend suggests: " + suggestion);
  };

  if (questions.length === 0) return <p>Loading questions...</p>;
  if (gameOver) return <GameOver earned={earned} reason={gameOverReason} />;
  if (currentQuestionIndex >= 18) return <Finish earned={earned} />;

  const current = questions[currentQuestionIndex];

  return (
    <div className={styles.root}>
      <Header userEmail={user?.email} />

      <div className={styles["game-container"]}>
        {notification && <Notification message={notification} />}

        <div className={styles["top-bar"]}>
          <Timer
            duration={30}
            onTimeUp={handleTimeUp}
            resetTrigger={timerReset}
          />
          <JokerPanel
            correctAnswer={current.correct_answer}
            allAnswers={shuffledAnswers}
            onFiftyFifty={handleFiftyFifty}
            onAudience={handleAudience}
            onPhone={handlePhone}
          />
        </div>

        <div className={styles["bottom-section"]}>
          <div className={styles["left-side"]}>
            <QuestionCard
              question={current.question}
              answers={visibleAnswers}
              onAnswerClick={handleAnswerClick}
            />
          </div>
          <div className={styles["right-side"]}>
            <MoneyLadder currentIndex={currentQuestionIndex} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
