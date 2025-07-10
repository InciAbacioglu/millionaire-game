type Props = {
  earned: string;
};

export default function Finish({ earned }: Props) {
  return (
    <div>
      <h2>🎉 Congratulations! You finished the quiz!</h2>
      <p>💵 Total Winnings: {earned}</p>
    </div>
  );
}
