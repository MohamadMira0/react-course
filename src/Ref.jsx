import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export default function Ref() {
  const [state, setState] = useState(5);
  let inputRef = useRef(null);
  useCallback(() => {}, []);
  useMemo(() => {}, []);

  useEffect(() => {
    console.log(inputRef);
    inputRef.current.sty;
  });

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div>
      <button onClick={() => setState((prev) => prev + 1)}>{state}</button>
      {/* <input ref={inputRef} type="text" /> */}
    </div>
  );
}
