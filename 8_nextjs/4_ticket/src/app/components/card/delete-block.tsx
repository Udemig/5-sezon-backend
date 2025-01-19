"use client";

import { deleteTicket } from "@/app/utils/service";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";

type Props = {
  id: string;
};

const DeleteBlock = ({ id }: Props) => {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Silmek istediğinizden emin misiniz?")) return;

    try {
      await deleteTicket(id);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FaTrash
      onClick={handleDelete}
      className="cursor-pointer hover:text-red-500 transition"
    />
  );
};

export default DeleteBlock;
