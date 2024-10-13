import { useQuery } from "@tanstack/react-query";
import api from "../api";
import Card from "../components/Card";
import Search from "../components/Search";
import Sort from "../components/Sort";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import Loader from "../components/Loader";
import Error from "../components/Error";

const Home = () => {
  const [order, setOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedTerm = useDebounce(searchTerm, 500);

  // api'a gönderilecek parametreleri belirle
  const params = {
    order,
    search: debouncedTerm,
  };

  // api'dan tarif verilerini al
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["recipes", order, debouncedTerm],
    queryFn: () =>
      api
        .get("/api/v1/recipes", { params })
        .then((res) => res.data.recipes),
  });

  return (
    <main className="overflow-y-auto">
      <Search setSearchTerm={setSearchTerm} />

      <section>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Error info={error.message} refetch={refetch} />
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h1 className="text-3xl my-5">
                {data.length} tarif bulundu
              </h1>

              <Sort setOrder={setOrder} />
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {data.map((i) => (
                <Card key={i.id} recipe={i} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default Home;
