import { User } from "../interfaces";

type Props = {
  items: User[];
};

export default function List({ items }: Props) {
  return (
    <ul>
      {items.map((user) => (
        <li key={user.id}>
          {user.name} — {user.email}
        </li>
      ))}
    </ul>
  );
}
