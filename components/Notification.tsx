import styles from "./Notification.module.scss";

type Props = {
  message: string;
};

export default function Notification({ message }: Props) {
  return <div className={styles.notification}>{message}</div>;
}
