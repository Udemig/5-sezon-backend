"use client";

import { useState } from "react";

const Input = () => {
  const [text, setText] = useState("");

  return (
    <div className="border border-red-500 my-10">
      <br />
      <h1>{text}</h1>
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        className="text-black"
      />
      <br />
      <span className="client">Client Comp</span>
      <br />
      <br />
    </div>
  );
};

export default Input;
