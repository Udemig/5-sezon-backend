type Props = {
  progress: number;
};

const ProgressBlock = ({ progress }: Props) => {
  return (
    <div className="w-full h-2.5 bg-gray-200 rounded-full">
      <div
        className="h-2.5 rounded-full"
        style={{ width: `${progress}%`, background: "#0084de" }}
      ></div>
    </div>
  );
};

export default ProgressBlock;
