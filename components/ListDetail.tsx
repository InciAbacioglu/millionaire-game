type Props = {
  item: Record<string, unknown>; // esnek yapı
};

export default function ListDetail({ item }: Props) {
  return (
    <div
      style={{
        padding: "1rem",
        background: "#111",
        borderRadius: "8px",
        color: "#fff",
      }}
    >
      <h2 style={{ marginBottom: "0.5rem" }}>{item.name}</h2>
      {item.email && <p>Email: {item.email}</p>}
    </div>
  );
}
