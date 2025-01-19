"use client";

const Error = ({ error, reset }) => {
  return (
    <div className="my-60 text-center text-xl">
      <h1>Bir şeyler ters gitti!</h1>
      <h2 className="mb-10 text-red-500">{error.message}</h2>

      <button onClick={reset} className="border rounded p-2">
        Tekrar Dene
      </button>
    </div>
  );
};

export default Error;
