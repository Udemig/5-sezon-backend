"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";

type Props = {
  children: string | JSX.Element;
  href: string;
  style?: string;
};

const NavLink = ({ children, href, style }: Props) => {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={`${
        href === path ? style || "bg-zinc-800 text-white" : "text-gray-500"
      } rounded-md`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
