import { links } from "@/app/utils/constants";
import NavLink from "../nav-link";
import { IoHelpCircleOutline as Help } from "react-icons/io5";
import { LuLogOut as Door } from "react-icons/lu";
import Image from "next/image";
import { Smooch_Sans } from "next/font/google";

const smooch = Smooch_Sans({
  weight: "900",
  subsets: ["latin"],
});

const Sidebar = () => {
  return (
    <aside className="bg-zinc-900 p-5 flex flex-col justify-between">
      <div className="bg-white rounded-full md:flex md:items-center md:gap-3 max-md:size-[40px]">
        <Image
          src="/logo.png"
          alt="logo"
          width={50}
          height={50}
          className="max-md:size-[40px]"
        />

        <span
          style={smooch.style}
          className="max-md:hidden text-zinc-800 text-4xl"
        >
          Rudder
        </span>
      </div>

      <nav className="flex flex-col">
        {links.map((item, key) => (
          <NavLink href={item.href} key={key}>
            <div className="flex items-center gap-2 px-3 md:pe-8 py-2 lg:text-lg">
              <span className="max-md:text-2xl">{item.icon}</span>

              <span className="max-md:hidden">{item.title}</span>
            </div>
          </NavLink>
        ))}
      </nav>

      <div className="flex flex-col items-start text-gray-500 gap-2 lg:text-lg">
        <button className="flex items-center gap-2">
          <Help className="text-[24px]" />
          <span className="max-md:hidden">Yardım Merkezi</span>
        </button>

        <button className="flex items-center gap-2">
          <Door className="max-md:text-xl" />
          <span className="max-md:hidden">Çıkış Yap</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
