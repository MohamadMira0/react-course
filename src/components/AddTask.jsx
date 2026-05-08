import { useState } from "react";
export default function Ahemd() {
  const [task, setTask] = useState("init");
  const [tasks, setTasks] = useState([]);
  const [check, setCheck] = useState(true);
  const [user, setUser] = useState({
    userName: "Mohammed Mira",
    email: "",
    password: "",
  });

  console.log(user);

  //   function handleSubmit() {
  //     try {
  //         fetch("URL" , {body: user})
  //     } catch (err) {
  //         console.log(err)
  //     }
  //   }

  return (
    <>
      <h1>New Task Page</h1>

      <form>
        <div>
          <label htmlFor="task" style={{ marginRight: 10, marginTop: 1 }}>
            Task:
          </label>
          <input
            type="text"
            id="task"
            // value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setTasks((tasks) => [...tasks, task])}
          >
            Add Task
          </button>
          <input
            type="checkbox"
            checked={check}
            onChange={() => setCheck((prev) => !prev)}
          />
        </div>
        <br />
        <div>
          <label htmlFor="username">username:</label>
          <input
            type="text"
            id="username"
            value={user.userName}
            onChange={(e) => setUser({ ...user, userName: e.target.value })}
          />
        </div>
        <br />
        <div>
          <label htmlFor="password">password:</label>
          <input
            type="text"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
      </form>
      {tasks.map((item) => (
        <h3>{item}</h3>
      ))}
    </>
  );
}
