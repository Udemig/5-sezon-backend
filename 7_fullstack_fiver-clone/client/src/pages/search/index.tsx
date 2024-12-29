import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import api from "../../api";
import Title from "./title";
import Loader from "../../components/loader";
import Error from "../../components/error";
import Card from "../../components/card";
import { IGig } from "../../types";

const Search = () => {
  // url'den parametreleri al
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const category = searchParams.get("category");

  // api'a gönderilecek parametreleri oluştur
  const params = {
    category,
    search: query,
  };

  // api'dan verileri al
  const { isLoading, error, data, refetch } = useQuery<IGig[]>({
    queryKey: ["gigs", params],
    queryFn: () => api.get("/gigs", { params }).then((res) => res.data.gigs),
  });

  return (
    <div>
      <Title query={query} category={category} />

      {isLoading ? (
        <Loader designs="my-20 size-8" />
      ) : error ? (
        <Error info={error} refetch={refetch} />
      ) : (
        <div className="layout">
          {data?.map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
