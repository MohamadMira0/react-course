import { useEffect, useRef } from "react";

export default function RefCom() {
  // const [state, setState] = useState(0);
  // let view = useRef(0);

  // useEffect(() => {
  //   view.current = view.current + 1;
  //   console.log(view);
  //   console.log(state);
  // }, []);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      {/* <button
        onClick={() => {
          setState(view.current);
        }}
      >
        {view.current}
      </button> */}

      <form>
        <div style={{ margin: 10 }}>
          <label htmlFor="email">Email</label>
          <input name="test1" ref={inputRef} type="email" id="email" />
        </div>
        <div style={{ margin: 10 }}>
          <label htmlFor="password">Password</label>
          <input name="test3" type="password" id="password" />
        </div>
        <button style={{ margin: 10 }}>Save</button>
      </form>
    </div>
  );
}
