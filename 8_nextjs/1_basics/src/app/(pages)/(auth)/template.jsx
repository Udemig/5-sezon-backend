"use client";

import { useState } from "react";
import Link from "next/link";

const Layout = ({ children }) => {
  const [name, setName] = useState("");

  return (
    <div className="flex  items-center gap-5">
      <nav className="border rounded flex flex-col gap-4 text-[20px] nav">
        <label>Merhaba, {name}</label>
        <input
          type="text"
          className="text-black"
          onChange={(e) => setName(e.target.value)}
        />

        <Link href="/login">Giriş Yap</Link>
        <Link href="/signup">Kayıt Ol</Link>
        <Link href="/forgotpass">Şifremi Unuttum</Link>
      </nav>

      <div className="page">{children}</div>
    </div>
  );
};

export default Layout;
