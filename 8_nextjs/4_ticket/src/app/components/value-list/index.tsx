type Props = {
  title: string;
  arr: object;
};

const ValueList = ({ title, arr }: Props) => {
  return (
    <div>
      <h1 className="text-zinc-500 text-xl font-semibold mb-2">{title}</h1>

      <div className="lg:grid grid-cols-3">
        {Object.entries(arr).map((item) => (
          <div className="bg-zinc-700 p-5 text-center text-zinc-300 border border-zinc-800 lg:p-10">
            <h2 className="text-xl font-semibold mb-2">{item[0]}</h2>
            <h1 className="text-4xl font-bold">{item[1]}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValueList;
