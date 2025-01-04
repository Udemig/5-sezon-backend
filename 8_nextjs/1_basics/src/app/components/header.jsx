import Link from "next/link";

const Header = () => {
  return (
    <header className="p-5 border-b flex justify-between">
      <Link href="/" className="font-bold">
        Next.js Routing
      </Link>

      <nav className="flex gap-4 text-blue-500">
        <Link href="/products">Ürünler</Link>
        <Link href="/profile">Profil</Link>
        <Link href="/docs/belge-1">Belge</Link>
        <Link href="/login">Giriş Yap</Link>
      </nav>
    </header>
  );
};

export default Header;
