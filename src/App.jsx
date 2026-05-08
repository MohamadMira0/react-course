// import "./App.css";
// import Navbar from "./components/Navbar";
// import Nancy, { SayHell as Ahemd, SayHi } from "./components/sayHello";
// import { SayHello } from "./components/SayHello";

// import AddTodo from "./components/AddTodo";

// import AddTask from "./components/AddTask";
import AddTask from "./components/AddTask";

function App() {
  // const [state, setState] = useState(init)
  // let [state, setState] = useState(0);
  // let num = 0;
  // let x = 5;
  // let y = 25;
  // var z = 35;
  // console.log(x);
  // console.log(y);
  // console.log(z);
  return (
    <>
      {/* <Navbar />
      <Nancy name="test" email="mira@gmail.com" />
      <SayHi name="HI" email="mira@gmail.com" />
      <Ahemd name="HELL" email="mira@gmail.com" /> */}
      {/* <SayHello name="test 2" email="mira2@gmail.com" />
      <SayHello name="test 3" email="mira3@gmail.com" /> */}
      {/* 
      <button
        onClick={() => {
          // num = num + 1;
          // console.log(num);
          console.log(state);
          setState((prev) => prev + 1);
          console.log();
          console.log(state);
        }}
      >
        increes
      </button>
      <span>current number is {state}</span> */}

      {/* <AddTodo /> */}
      <AddTask />
      {/* <Hassan /> */}
    </>
  );
}

export default App;
