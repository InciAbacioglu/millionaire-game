import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../utils/firebase";
import styles from "../styles/Leaderboard.module.scss"; // ✅ SCSS eklendi

type GameResult = {
  email: string;
  earned: string;
  result: string;
  date: string;
};

export default function Leaderboard() {
  const [results, setResults] = useState<GameResult[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const q = query(
        collection(db, "gameResults"),
        orderBy("earned", "desc"),
        limit(10)
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => doc.data() as GameResult);
      setResults(data);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🏆 Leaderboard</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Earnings</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={i}>
              <td>{r.email}</td>
              <td>{r.earned}</td>
              <td>{new Date(r.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
