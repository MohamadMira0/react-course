import { useEffect, useState } from "react";
import Post from "./components/Post";

export default function Posts() {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  //   const [allCounter, setAllCounter] = useState(0);

  useEffect(() => {
    (async function getData() {
      try {
        let res = await fetch("https://jsonplaceholder.typicode.com/posts");
        let resData = await res.json();
        setAllData(resData);
        console.log(resData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [counter]);

  console.log(counter);
  if (loading)
    return <h1 style={{ textAlign: "center", color: "red" }}>Loading...</h1>;

  return (
    <>
      <button onClick={() => setCounter((prev) => prev + 1)}>
        increes counter
      </button>
      <div>
        {allData.map((item) => (
          <Post tit={item.title} body={item.body} />
        ))}
      </div>
    </>
  );
}
