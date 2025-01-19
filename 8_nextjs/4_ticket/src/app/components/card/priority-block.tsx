import { FaFire } from "react-icons/fa";

type Props = {
  priority: number;
};

const PriorityBlock = ({ priority }: Props) => {
  return (
    <div className="flex justify-start align-baseline">
      {new Array(5).fill("").map((i, key) => (
        <FaFire
          className="pr-1"
          style={{ color: priority > key ? "#FF5C5C" : "#C5C5C5" }}
        />
      ))}
    </div>
  );
};

export default PriorityBlock;
