import { useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";

// SCSS import!
import styles from "./Finish.module.scss";

type Props = {
  earned: string;
};

export default function Finish({ earned }: Props) {
  useEffect(() => {
    const saveResult = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          await addDoc(collection(db, "gameResults"), {
            uid: user.uid,
            email: user.email,
            earned,
            date: new Date().toISOString(),
          });
        } catch (err) {
          console.error("Error saving game result:", err);
        }
      }
    };

    saveResult();
  }, [earned]);

  return (
    <div className={styles.container}>
      <h1>🎉 You won: {earned}</h1>
      <p>Your result has been saved!</p>
    </div>
  );
}
