import { Link } from "react-router-dom";

const Links = () => {
  return (
    <>
      <Link to="/login" className="transition hover:text-green-500">
        Giriş Yap
      </Link>
      <Link
        to="/register"
        className="transition border rounded border-green-500 p-1 hover:bg-green-500 hover:text-white"
      >
        Kaydol
      </Link>
    </>
  );
};

export default Links;
