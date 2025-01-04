import Link from "next/link";

const NotFound = () => {
  return (
    <div className="page">
      <h1 className="text-5xl text-yellow-500">404</h1>

      <h1>Üzgünüz aradığınız sayfa bulunamadı</h1>

      <Link href="/" className="text-blue-500">
        Anasayfa'ya git
      </Link>
    </div>
  );
};

export default NotFound;
