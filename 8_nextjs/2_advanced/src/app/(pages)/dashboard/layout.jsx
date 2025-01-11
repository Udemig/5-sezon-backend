// Slot olarak (@ işareti ile) tanımlanan sayfalar prop olarak layout component'ına gelir.

import Link from "next/link";

// Aldığımız propları birden fazla sayfayı aynı anda ekrana basmak için kullanırız

const Layout = ({ children, notifications, revenue, users }) => {
  return (
    <>
      <div className="py-5 flex justify-center gap-10 text-xl">
        <Link href="/dashboard">Admin Paneli</Link>
        <Link href="/dashboard/settings">Panel Ayarları</Link>
      </div>

      <div className="p-4 my-10">
        {children}

        <div className="flex mt-10">
          <div className="flex-1">
            <div className="border p-5">{users}</div>
            <div className="border p-5">{revenue}</div>
          </div>

          <div className="border p-5">{notifications}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
