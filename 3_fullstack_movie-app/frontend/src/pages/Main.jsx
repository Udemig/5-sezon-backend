import api from "../utils/api";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import Error from "../components/Error";

const Main = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["movies"],
    queryFn: () => api.get("/api/movies123").then((res) => res.data),
  });

  return (
    <div className="px-5 md:px-10">
      <h2>HERO</h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error info={error} refetch={refetch} />
      ) : (
        <div>
          {data.map((movie) => (
            <div>KART</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Main;
