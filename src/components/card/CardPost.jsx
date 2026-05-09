import "./card.css";

export default function CardPost({ body, title, userId }) {
  return (
    <div
      style={{
        width: "400px",
        color: "red",
      }}
    >
      {/* <h1 class="text-3xl font-bold underline">Hello world!</h1> */}
      <h1>{userId}</h1>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}
