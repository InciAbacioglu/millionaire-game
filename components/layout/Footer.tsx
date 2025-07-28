"use client";
import { useEffect, useState } from "react";
import styles from "./Footer.module.scss";

export default function Footer() {
  const [isClient, setIsClient] = useState(false);
  const name = "İnci Mercan Abacıoğlu";

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <footer className={styles.footer}>
      <div className={styles.profile}>
        <img src="/ben.jpeg" alt={name} className={styles.avatar} />
        <h2>{name}</h2>
        <p>Software Developer</p>
      </div>

      <div className={styles.links}>
        <a
          href="https://github.com/InciAbacioglu"
          target="_blank"
          rel="noreferrer"
        >
          GitHub: github.com/InciAbacioglu
        </a>
        <a href="mailto:nacrem26@icloud.com">Email: nacrem26@icloud.com</a>
      </div>
    </footer>
  );
}
