type Props = {
  earned: string;
};

export default function GameOver({ earned }: Props) {
  return (
    <div>
      <h2>🛑 Game Over – You gave 3 wrong answers.</h2>
      <p>💵 You Earned: {earned}</p>
    </div>
  );
}
