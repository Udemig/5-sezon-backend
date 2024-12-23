import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import User from "./user";
import Links from "./links";
import { useAuth } from "../../context/authContent";
import Form from "./form";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="p-5 shadow">
      <div className="max flex justify-between gap-4 md:gap-8">
        <Link to="/">
          <img src="/fiverr.png" alt="fiverr logo" className="w-[100px]" />
        </Link>

        <Form />

        <div className="flex items-center gap-2 relative group">
          {user ? <User data={user} logout={logout} /> : <Links />}
        </div>
      </div>
    </header>
  );
};

export default Header;
