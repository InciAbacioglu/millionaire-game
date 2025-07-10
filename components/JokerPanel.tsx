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
    <div style={{ marginBottom: "1rem" }}>
      <button onClick={() => onFiftyFifty()}>🎲 50:50</button>
      <button onClick={() => onAudience()}>👥 Audience</button>
      <button onClick={() => onPhone()}>☎ Phone</button>
    </div>
  );
}
