import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import styles from "../styles/Profile.module.scss";

type GameResult = {
  earned: string;
  date: string;
  result: string;
};

export default function Profile() {
  const [results, setResults] = useState<GameResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserResults = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, "gameResults"),
        where("uid", "==", user.uid)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => doc.data() as GameResult);
      setResults(data);
      setLoading(false);
    };

    fetchUserResults();
  }, []);

  if (loading)
    return <p className={styles.loading}>Loading your game history...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>👤 Your Game History</h2>

      {results.length === 0 ? (
        <p className={styles.empty}>No games played yet.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Result</th>
                <th>Earnings</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i}>
                  <td>{r.result === "fail" ? "❌ Fail" : "✅ Win"}</td>
                  <td>{r.earned}</td>
                  <td>{new Date(r.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
