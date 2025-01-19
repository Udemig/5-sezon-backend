import Image from "next/image";
import { FaEnvelope } from "react-icons/fa";
import { LuBellRing } from "react-icons/lu";

const Header = () => {
  return (
    <header className="flex justify-end items-center gap-5">
      <div className="bg-zinc-900 p-2 rounded-md">
        <LuBellRing />
      </div>

      <div className="bg-zinc-900 p-2 rounded-md">
        <FaEnvelope />
      </div>

      <Image
        src="/profile.jpg"
        alt="profile"
        width={45}
        height={45}
        className="rounded-full ring-1 ring-zinc-500"
      />
    </header>
  );
};

export default Header;
