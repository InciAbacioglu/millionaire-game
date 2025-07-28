import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../utils/firebase";

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

  if (loading) return <p>Loading your game history...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>👤 Your Game History</h2>
      {results.length === 0 ? (
        <p>No games played yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>Result</th>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>Earnings</th>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i}>
                <td style={{ padding: "0.5rem" }}>
                  {r.result === "fail" ? "❌ Fail" : "✅ Win"}
                </td>
                <td style={{ padding: "0.5rem" }}>{r.earned}</td>
                <td style={{ padding: "0.5rem" }}>
                  {new Date(r.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
