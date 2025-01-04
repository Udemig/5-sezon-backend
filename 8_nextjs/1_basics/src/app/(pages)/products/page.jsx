import Link from "next/link";

export const metadata = {
  title: "Ürünler",
  description: "En iyi ürünler bizde...",
};

const Products = () => {
  return (
    <div className="page">
      <h1>ÜRÜNLER SAYFASI</h1>

      <Link href="/products/1">Ürün - 1</Link>
      <Link href="/products/2">Ürün - 2</Link>
      <Link href="/products/3">Ürün - 3</Link>
      <Link href="/products/4">Ürün - 4</Link>
      <Link href="/products/5">Ürün - 5</Link>
    </div>
  );
};

export default Products;
