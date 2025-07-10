type Props = {
  currentIndex: number;
};

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

export default function MoneyLadder({ currentIndex }: Props) {
  return (
    <div className="money-ladder">
      {moneyList.map((amount, index) => (
        <div
          key={index}
          className={`ladder-step ${currentIndex === index ? "active" : ""}`}
        >
          <span>{18 - index}</span> {amount}
        </div>
      ))}
    </div>
  );
}
