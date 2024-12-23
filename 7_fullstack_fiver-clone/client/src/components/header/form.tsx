import { FormEvent } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  // form gönderilince
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const text = (e.currentTarget[0] as HTMLInputElement).value;

    navigate(`/search?query=${text}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 flex border rounded overflow-hidden max-w-[500px]"
    >
      <input
        type="text"
        className="w-full h-full px-3 outline-none"
        placeholder="hizmet ara..."
        defaultValue={params.get("query") || undefined}
      />

      <button className="bg-black p-2 text-white text-xl max-sm:hidden">
        <IoSearch />
      </button>
    </form>
  );
};

export default Form;
