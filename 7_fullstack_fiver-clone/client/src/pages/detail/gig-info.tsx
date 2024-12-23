import { FaStar } from "react-icons/fa";
import { IGigDetail } from "../../types";

// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import Rating from "../../components/rating";

type Props = {
  gig: IGigDetail;
};

const GigInfo = ({ gig }: Props) => {
  return (
    <div className="flex-1 flex flex-col gap-5">
      <h1 className="font-bold text-xl md:text-2xl">{gig.title}</h1>

      {/* gig bilgileri */}
      <div className="flex gap-3 items-center">
        <img src={gig.user.photo} className="size-12 rounded-full" />

        <div>
          <h4 className="font-bold">{gig.user.username}</h4>

          <Rating rating={4.3} reviews={"56 reviews"} />
        </div>
      </div>

      {/* resim galerisi */}
      <Splide>
        {gig.images.map((url, key) => (
          <SplideSlide key={key}>
            <img src={url} className="h-[30vh] w-full object-cover" />
          </SplideSlide>
        ))}
      </Splide>

      {/* gig hakkında */}
      <div>
        <h1 className="font-bold text-lg mt-5 mb-2">Bu hizmet hakkında</h1>

        <p className="text-gray-600">{gig.description}</p>
      </div>
    </div>
  );
};

export default GigInfo;
