import { toast } from "react-toastify";
import useComments from "../../hooks/useComments";

const CommentForm = ({ postId }: { postId: string }) => {
  const { create } = useComments();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const text = e.currentTarget.text.value.trim();

    if (!text) toast.warning("Yorum boş bırakılamaz");

    create.mutate({ postId, content: text });

    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-5">
      <input
        name="text"
        className="flex-1 border border-dark-20 rounded-md py-2 px-4 focus:border-white/70 outline-none"
        placeholder="Yorumunuzu giriniz..."
        type="text"
      />

      <button className="bg-yellow-55 text-black px-4 py-2 rounded-md cursor-pointer hover:bg-yellow-55/60 transition-colors">
        Gönder
      </button>
    </form>
  );
};

export default CommentForm;
