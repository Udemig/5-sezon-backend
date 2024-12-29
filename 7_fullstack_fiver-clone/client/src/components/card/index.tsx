import { Link } from "react-router-dom";
import { IGig } from "../../types";
import { FaStar } from "react-icons/fa";
import Rating from "../rating";
import Buttons from "./buttons";

type Props = {
  item: IGig;
  expand?: boolean;
};

const Card = ({ item, expand }: Props) => {
  return (
    <div>
      {expand && <Buttons item={item} />}

      <Link
        to={`/detail/${item._id}`}
        className="p-2 rounded-md cursor-pointer flex flex-col gap-2 group"
      >
        <img
          src={item.coverImage}
          className="h-full w-full object-cover rounded-md max-h-[200px]"
        />

        <div className="flex gap-2 items-center">
          <img src={item.user.photo} className="size-8 rounded-full" />
          <p>
            <span className="font-semibold">{item.user.username} </span>
            <span className="text-gray-500">tarafından oluşturuldu</span>
          </p>
        </div>

        <h2 className="line-clamp-2 group-hover:underline">{item.title}</h2>

        <Rating rating={4.5} reviews={"1k+"} designs="font-semibold text-lg" />

        <p className="font-semibold">
          <span>₺{item.package_price.toLocaleString()}</span>
          <span className="text-gray-500 font-normal">
            'den başlayan fiyatlarla
          </span>
        </p>
      </Link>
    </div>
  );
};

export default Card;
