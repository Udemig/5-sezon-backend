type Props = {
  status: string;
};

const StatusBlock = ({ status }: Props) => {
  const getColor = () => {
    switch (status.toLowerCase()) {
      case "beklemede":
        return "bg-orange-500";
      case "devam ediyor":
        return "bg-blue-500";
      case "çözüldü":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <span
      className={`inline-block rounded-full bg-green-500 px-2 py-1 font-semibold text-xs ${getColor()}`}
    >
      {status}
    </span>
  );
};

export default StatusBlock;
