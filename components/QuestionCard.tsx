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
    <div style={{ padding: "2rem" }}>
      <h2 dangerouslySetInnerHTML={{ __html: question }} />
      {answers.map((answer, idx) => (
        <button
          key={idx}
          onClick={() => onAnswerClick(answer)}
          style={{ display: "block", margin: "1rem 0", padding: "0.5rem" }}
        >
          {answer}
        </button>
      ))}
    </div>
  );
}
