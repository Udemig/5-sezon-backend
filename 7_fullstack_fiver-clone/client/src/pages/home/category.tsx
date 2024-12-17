import { Link } from "react-router-dom";
import { categories } from "../../utils/constants";

const Category = () => {
  return (
    <div className="my-10 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-5">
      {categories.map((i, key) => (
        <Link
          to={`/search?category=${i.name}`}
          key={key}
          className="border shadow p-4 rounded-md cursor-pointer hover:shadow-xl hover:bg-gray-100"
        >
          <div className="flex flex-col gap-3 items-center text-center">
            <span className="text-3xl">{i.icon}</span>
            <span className="font-semibold text-sm">{i.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Category;
