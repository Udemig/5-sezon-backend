import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-5 md:px-10 border-b shadow mb-10">
      <Link to="/" className="flex items-center">
        <img width={80} src="/movie-logo.png" />
        <h2 className="font-bold text-2xl max-sm:hidden">Filmania</h2>
      </Link>

      <Link
        className="border rounded-full py-1 px-5 hover:bg-black hover:text-white transition"
        to="/create"
      >
        Film Oluştur
      </Link>
    </header>
  );
};

export default Header;
