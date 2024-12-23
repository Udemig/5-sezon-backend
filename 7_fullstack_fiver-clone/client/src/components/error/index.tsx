type Props = {
  info?: string;
  refetch?: () => void;
};

const Error = ({ info, refetch }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center my-20 bg-red-500/80 py-10 px-5 rounded-lg text-white">
      <p>{info || "Üzgünüz, bir hata oluştu"}</p>

      <p>Lütfen daha sonra tekrar deneyin.</p>

      {refetch && (
        <button
          className="border py-1 px-3 rounded-md hover:bg-gray-200/20 transition"
          onClick={refetch}
        >
          Tekrar Dene
        </button>
      )}
    </div>
  );
};

export default Error;
