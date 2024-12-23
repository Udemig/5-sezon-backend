import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";

type Props = {
  category: string;
};

const BreadCrumb = ({ category }: Props) => {
  return (
    <div className="my-5">
      <p className="flex gap-3 items-center text-gray-500">
        <Link to="/">
          <AiOutlineHome />
        </Link>
        <span>/</span>
        <Link to={`/search?category=${category}`} className="hover:underline">
          {category}
        </Link>
      </p>
    </div>
  );
};

export default BreadCrumb;
