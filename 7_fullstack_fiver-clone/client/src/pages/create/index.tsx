import { FormEvent } from "react";
import Input from "../../components/input";
import Select from "../../components/input/select";
import { categories, inputs } from "../../utils/constants";
import { useMutation } from "@tanstack/react-query";
import api from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";

const Create = () => {
  const navigate = useNavigate();

  // tanstack/react-query kullanarak api isteği at
  const { isPending, mutate } = useMutation({
    mutationFn: (data: FormData) =>
      api.post("/gigs", data, {
        headers: { "Content-Type": "multipart/form-data" },
      }),

    onSuccess: (res) => {
      toast.success("Hizmet başarıyla oluşturuldu.");

      navigate(`/detail/${res.data.gig._id}`);
    },

    onError: (err) => {
      toast.error("Hizmet oluşturulurken bir hata oluştu.");
    },
  });

  // form gönderilince
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // inputlardaki verileri al
    const data = new FormData(e.currentTarget);

    // api'a post isteği at
    mutate(data);
  };

  return (
    <div>
      <h1 className="font-bold text-3xl mb-5">Yeni Hizmet Oluştur</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
          {inputs.map((props, key) => (
            <Input key={key} {...props} />
          ))}

          <Select label="Kategori" options={categories} name="category" />
        </div>

        <div className="flex md:justify-center my-5">
          <button
            disabled={isPending}
            className="bg-green-500 px-6 py-2 rounded-md text-white hover:bg-green-600 max-md:w-full w-1/2 flex justify-center disabled:opacity-80"
          >
            {isPending ? <Loader /> : "Oluştur"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
