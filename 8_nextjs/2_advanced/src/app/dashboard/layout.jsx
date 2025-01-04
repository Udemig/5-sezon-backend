// Slot olarak (@ işareti ile) tanımlanan sayfalar prop olarak layout component'ına gelir.

// Aldığımız propları birden fazla sayfayı aynı anda ekrana basmak için kullanırız

const Layout = ({ children, notifications, revenue, users }) => {
  return (
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
  );
};

export default Layout;
