import { useEffect, useState } from "react";
import CardPost from "./card/CardPost";

export default function Posts() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    (async function getData() {
      try {
        let res = await fetch("https://jsonplaceholder.typicode.com/posts");
        let resData = await res.json();
        setData(resData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      {data?.map((item) => (
        <CardPost userId={item.userId} title={item.title} body={item.body} />
      ))}
    </div>
  );
}
