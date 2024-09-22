import InputField from "../components/InputField";
import { inputs } from "../utils/constants";
import api from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();

  // form gönderilince
  const handleSubmit = (e) => {
    e.preventDefault();

    // inputlardaki veriyi al (nesne şeklinde)
    const formdata = new FormData(e.target);
    const movieData = Object.fromEntries(formdata.entries());

    // kategorileri diziye çevir
    movieData.genre = movieData.genre.split(",");

    // ekibi diziye çevir
    movieData.cast = movieData.cast.split(",");

    // api'a film oluşturmak için http isteği at
    api
      .post("/api/movies", movieData)
      .then((res) => {
        // bildirim gönder
        toast.success("Film Listeye Eklendi");

        // detay sayfasına yönlendir
        navigate(`/movie/${res.data.id}`);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Üzgünüz :( İşlem Başarısız");
      });
  };

  return (
    <div className="bg-yellow-600 flex-1 grid place-items-center px-5 py-8">
      <div className="bg-white w-full max-w-[800px] p-10 rounded shadow-lg">
        <h1 className="text-3xl font-semibold mb-6">Yeni Film Oluştur</h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {inputs.map((props) => (
            <InputField {...props} />
          ))}

          <button className="shadow border py-3 rounded-lg hover:shadow-lg hover:bg-gray-200 transition">
            Oluştur
          </button>
        </form>

        {/* 
        <div className="md:mt-10 ">
          <img
            src="/movie-bg.jpg"
            className="rounded-full max-h-[200px] m-auto"
          />
        </div> */}
      </div>
    </div>
  );
};

export default Create;
