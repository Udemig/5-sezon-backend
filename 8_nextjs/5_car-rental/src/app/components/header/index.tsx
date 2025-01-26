import Link from "next/link";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaHeart, FaBell } from "react-icons/fa";
import { RiSettings4Fill as Settings } from "react-icons/ri";

const Header: React.FC = () => {
  return (
    <header className="bg-white flex justify-between items-center py-5 px-7 lg:py-8 lg:px-10">
      <Link href="/" className="text-basic-blue font-bold text-2xl lg:text-4xl">
        DRIVE
      </Link>

      <form className="flex gap-2 py-2 px-4 rounded-full border border-zinc-300 md:w-2/4">
        <button className="text-zinc-700 text-xl">
          <CiSearch />
        </button>
        <input
          type="text"
          placeholder="Bir marka aratın"
          className="outline-none text-zinc-800"
        />
      </form>

      <div className="flex items-center gap-3">
        <div className="p-2 border border-zinc-300 rounded-full text-zinc-600 hover:bg-zinc-200 cursor-pointer transition max-sm:hidden">
          <FaHeart />
        </div>
        <div className="p-2 border border-zinc-300 rounded-full text-zinc-600 hover:bg-zinc-200 cursor-pointer transition max-sm:hidden">
          <FaBell />
        </div>
        <div className="p-2 border border-zinc-300 rounded-full text-zinc-600 hover:bg-zinc-200 cursor-pointer transition clear-start text-lg">
          <Settings />
        </div>

        <img
          src="/profile.jpeg"
          alt="profile"
          className="rounded-full size-[36px]"
        />
      </div>
    </header>
  );
};

export default Header;
