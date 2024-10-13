import { useMutation } from "@tanstack/react-query";
import { FaTrashAlt } from "react-icons/fa";
import api from "../api";
import { LoaderSm } from "./Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DeleteButton = ({ productId }) => {
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation({
    mutationFn: () => api.delete(`/api/v1/recipes/${productId}`),

    onSuccess: () => {
      navigate("/");
      toast.success("Tarif kaldırıldı");
    },

    onError: () => {
      toast.error("İşlem başarısız");
    },
  });

  return (
    <button
      disabled={isLoading}
      onClick={mutate}
      className="btn flex gap-2 items-center bg-red-500 hover:bg-red-600 py-1 min-w-[80px] justify-center"
    >
      {isLoading ? (
        <LoaderSm />
      ) : (
        <>
          <FaTrashAlt />
          Sil
        </>
      )}
    </button>
  );
};

export default DeleteButton;
