import { useState } from "react";

export default function AddTodo() {
  //   let [num, setNum] = useState(0);
  //   let [email, setEmail] = useState("");
  //   let [numbers, setNumbers] = useState([]);
  let [user, setUser] = useState({
    email: "",
    password: "",
  });

  console.log(user);

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       fetch("URL", { body: user, method: "POST" });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   const handelIncrees = () => {
  //     setNum((prev) => prev + 1);
  //     setNumbers((nums) => [...nums, num + 1]);
  //   };
  return (
    <>
      <h1>AddTodo</h1>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={user.email}
            // onChange={(e) => setEmail(e.target.value)}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="Passord">Passord:</label>
          <input
            type="text"
            required
            id="Passord"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <button>Update</button>
      </form>
    </>
  );
}
