import { FC } from "react";

interface ErrorProps {
  message: string;
  refetch?: () => void;
}

const Error: FC<ErrorProps> = ({ message, refetch }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="text-red-500">{message}</p>

      {refetch && <button onClick={refetch}>Tekrar dene</button>}
    </div>
  );
};

export default Error;
