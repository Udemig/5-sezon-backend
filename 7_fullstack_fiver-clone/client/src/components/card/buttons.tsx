import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IGig } from "../../types";
import api from "../../api";

type Props = {
  item: IGig;
};

const Buttons = ({ item }: Props) => {
  const client = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => api.delete(`/gigs/${item._id}`),

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["my-gigs"] });
    },
  });

  return (
    <div className="flex justify-end px-2">
      <button
        className="button bg-red-400"
        disabled={isPending}
        onClick={() => {
          if (confirm("Silmeyi onaylıyor musunuz?")) {
            mutate();
          }
        }}
      >
        Sil
      </button>
    </div>
  );
};

export default Buttons;
