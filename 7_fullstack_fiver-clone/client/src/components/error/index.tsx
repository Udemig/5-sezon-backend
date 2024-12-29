type ExtendedError = {
  response?: {
    data?: { message?: string };
  };
} & Error;

type Props = {
  info?: Error;
  refetch?: () => void;
};

const Error = ({ info, refetch }: Props) => {
  return (info as ExtendedError)?.response?.data?.message ===
    "Hiç hizmet bulunamadı" ? (
    <div className="py-10 px-5 rounded-lg bg-orange-500/80 text-white text-center font-semibold my-20">
      Aradığınız koşullara uygun hizmet bulunamadı{" "}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-4 text-center my-20 bg-red-500/80 py-10 px-5 rounded-lg text-white">
      <p>{info?.message || "Üzgünüz, bir hata oluştu"}</p>

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
