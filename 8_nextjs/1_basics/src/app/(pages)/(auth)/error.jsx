"use client";

const Error = ({ error, reset }) => {
  return (
    <div className="text-xl">
      <h1>Üzgünüz bir sorun oluştu</h1>
      <br />
      <hr />

      <br />
      <p>{error.message}</p>
      <br />

      <hr />
      <br />

      <button onClick={reset}>Tekrar Dene</button>
    </div>
  );
};

export default Error;
