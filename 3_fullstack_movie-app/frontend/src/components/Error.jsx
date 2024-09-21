// TODO STILLENDIR
const Error = ({ info, refetch }) => {
  return (
    <div>
      <h1>{info.message}</h1>

      <button onClick={refetch}>Tekrar Dene</button>
    </div>
  );
};

export default Error;
