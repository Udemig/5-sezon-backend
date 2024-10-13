import { useNavigate, useParams } from "react-router-dom";
import Form from "../components/Form";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api";
import { toast } from "react-toastify";

const Update = () => {
  const navigate = useNavigate();

  // url'den düzenlenicek elmanın id'sini al
  const { id } = useParams();

  // api'dan düzenlenicek elmeanın bilgilerini al
  const { data } = useQuery({
    queryKey: ["recipe"],
    queryFn: () =>
      api.get(`/api/v1/recipes/${id}`).then((res) => res.data.found),
  });

  // api'a güncelleme isteği atıcak mutasyonu hazırla
  const { isLoading, mutate } = useMutation({
    mutationFn: (updatedData) =>
      api.patch(`/api/v1/recipes/${id}`, updatedData),

    onSuccess: () => {
      toast.success("Güncelleme Başarılı");

      navigate(`/`);
    },

    onError: () => {
      toast.error(`Bir şeyler ters gitti`);
    },
  });

  return (
    <div>
      <div>
        <h1 className="text-red-400 text-3xl font-bold">Tarifi Düzenle</h1>

        {/* gerekli propları forma gönder */}
        <Form isLoading={isLoading} mutate={mutate} recipeData={data} />
      </div>
    </div>
  );
};

export default Update;
