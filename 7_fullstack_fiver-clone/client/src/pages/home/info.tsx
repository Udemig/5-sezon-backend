import { BsFillPatchCheckFill } from "react-icons/bs";
import { items } from "../../utils/constants";

const Info = () => {
  return (
    <section className="my-10 bg-green-100 bg-opacity-70 rounded-md p-4 sm:p-6">
      <h1 className="text-3xl">
        <span className="font-extrabold">fiverr</span>
        <span>.pro</span>
      </h1>

      <p className="text-3xl font-light my-6 sm:my-8">
        İşletmeler için <span className="text-green-400">premium </span>
        freelance çözümü
      </p>

      <div className="grid md:grid-cols-2 gap-5">
        {items.map((item) => (
          <div>
            <h5 className="font-semibold flex items-center gap-3">
              <BsFillPatchCheckFill className="text-lg" />
              {item.title}
            </h5>

            <p>{item.text}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center my-6 sm:my-8">
        <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-zinc-800">
          Şimdi Dene
        </button>
      </div>
    </section>
  );
};

export default Info;
