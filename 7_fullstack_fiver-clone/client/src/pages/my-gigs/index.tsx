import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/authContent";
import api from "../../api";
import Loader from "../../components/loader";
import Error from "../../components/error";
import Card from "../../components/card";
import { IGig } from "../../types";

const MyGigs = () => {
  // kullanıcı bilgilerini context'den al
  const { user } = useAuth();

  // kullanıcya ait olan hizmetleri al
  const { isLoading, error, data, refetch } = useQuery<IGig[]>({
    queryKey: ["my-gigs", user],
    queryFn: () =>
      api
        .get("/gigs", { params: { userID: user?._id } })
        .then((res) => res.data.gigs),
  });

  return (
    <div>
      <h1 className="font-bold text-3xl mb-5 text-gray-600">Hizmetlerim</h1>

      <div>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Error info={error} refetch={refetch} />
        ) : (
          data && (
            <div className="layout">
              {data.map((item) => (
                <Card key={item._id} item={item} expand />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MyGigs;
