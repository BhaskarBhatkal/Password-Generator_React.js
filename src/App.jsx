import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pwd = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    // str concat with numbers
    if (numAllowed) str += "0123456789";
    // str concat with characters
    if (charAllowed) str += "!@#$%^&*?+=-^~";
    for (let i = 1; i <= length; i++) {
      //we'll get character index
      let charIndex = Math.floor(Math.random() * str.length + 1);
      pwd += str.charAt(charIndex);
    }
    setPassword(pwd);
  }, [length, numAllowed, charAllowed]);

  const copyPwdToClipboard = useCallback(() => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <div
      className="text-gray-500 w-full max-w-lg 
    mx-auto shadow-md rounded-lg px-4 py-2 my-9
     bg-gray-800"
    >
      <strong>
        <u>
          <h1 className="text-white text-center pb-2 mb-2 mt-1">
            Password Generator
          </h1>
        </u>
      </strong>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 rounded-lg "
          placeholder="password"
          readOnly
          ref={passwordRef}
        />
        <button
          type="button"
          className="bg-blue-600 text-white px-3 shrink-0 outline-none rounded-md"
          onClick={copyPwdToClipboard}
        >
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center-gap-x-1">
          <input
            type="range"
            min={5}
            max={50}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label className="ml-0.5 text-sky-200">Length:{length}</label>
        </div>
        <div className="flex items-center gap-x-0.5 ml-1">
          <input
            type="checkbox"
            defaultChecked={numAllowed}
            onChange={() => {
              setNumAllowed((prev) => !prev);
            }}
          />
          <label className="text-sky-200">Numbers</label>
        </div>
        <div className="flex items-center gap-x-0.5 ml-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label className="text-sky-200">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
