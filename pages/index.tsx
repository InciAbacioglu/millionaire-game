import { useEffect, useState } from "react";
import Timer from "../components/Timer";
import QuestionCard from "../components/QUestionCard";
import JokerPanel from "../components/JokerPanel";
import MoneyLadder from "../components/MoneyLadder";
import GameOver from "../components/GameOver";
import Finish from "../components/Finish";

type Question = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  difficulty: "easy" | "medium" | "hard";
};

export default function Home() {
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
    const fetchQuestions = async () => {
      const difficulties = ["easy", "medium", "hard"];
      const all: Question[] = [];

      for (const diff of difficulties) {
        const res = await fetch(
          `https://opentdb.com/api.php?amount=6&difficulty=${diff}&type=multiple`
        );
        const data = await res.json();
        if (data?.results?.length > 0) {
          all.push(...data.results);
        }
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

  const handleAnswerClick = (answer: string) => {
    const correct = questions[currentQuestionIndex].correct_answer;

    if (answer === correct) {
      setNotification("✅ Correct!");
      setTimeout(() => setNotification(null), 1500);
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimerReset((prev) => prev + 1);
    } else {
      const newWrongCount = wrongCount + 1;
      setNotification(`❌ Wrong! Remaining chances: ${3 - newWrongCount}`);
      setTimeout(() => setNotification(null), 2000);

      setWrongCount(newWrongCount);
      if (newWrongCount >= 3) {
        setGameOver(true);
      }
    }
  };

  const handleTimeUp = () => {
    setNotification("⏰ Time's up!");
    setTimeout(() => setNotification(null), 2000);
    setCurrentQuestionIndex((prev) => prev + 1);
    setTimerReset((prev) => prev + 1);
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
  if (gameOver) return <GameOver earned={earned} />;
  if (currentQuestionIndex >= 18) return <Finish earned={earned} />;

  const current = questions[currentQuestionIndex];

  return (
    <div className="game-container">
      {notification && (
        <div
          style={{
            background: "#222",
            color: "#fff",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          {notification}
        </div>
      )}

      <Timer duration={30} onTimeUp={handleTimeUp} resetTrigger={timerReset} />

      <JokerPanel
        correctAnswer={current.correct_answer}
        allAnswers={shuffledAnswers}
        onFiftyFifty={handleFiftyFifty}
        onAudience={handleAudience}
        onPhone={handlePhone}
      />

      <QuestionCard
        question={current.question}
        answers={visibleAnswers}
        onAnswerClick={handleAnswerClick}
      />

      <MoneyLadder currentIndex={currentQuestionIndex} />
    </div>
  );
}
