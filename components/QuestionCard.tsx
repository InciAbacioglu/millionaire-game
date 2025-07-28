import styles from "./QuestionCard.module.scss";

type Props = {
  question: string;
  answers: string[];
  onAnswerClick: (answer: string) => void;
};

export default function QuestionCard({
  question,
  answers,
  onAnswerClick,
}: Props) {
  return (
    <div className={styles.card}>
      <h2
        className={styles.question}
        dangerouslySetInnerHTML={{ __html: question }}
      />
      {answers.map((answer, idx) => (
        <button
          key={idx}
          onClick={() => onAnswerClick(answer)}
          className={styles.answerButton}
        >
          {answer}
        </button>
      ))}
    </div>
  );
}
