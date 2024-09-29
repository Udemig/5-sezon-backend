import React from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { toast } from "react-toastify";

const DeleteButton = ({ id }) => {
  const navigate = useNavigate();

  // filmi silmek için api isteği at
  const handleDelete = () => {
    api
      .delete(`/api/movies/${id}`)
      .then(() => {
        navigate("/");
        toast.warning("Film kaldırıldı");
      })
      .catch((err) => {
        console.log(err);
        toast.err("Silme işlemi başarısız oldu");
      });
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white p-2 rounded-md hover:bg-red-400"
    >
      <FaTrash />
    </button>
  );
};

export default DeleteButton;
