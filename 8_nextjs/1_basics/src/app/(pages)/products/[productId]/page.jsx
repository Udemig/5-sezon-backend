import Link from "next/link";
import { notFound } from "next/navigation";

// static bir metadata tanımı
// export const metadata = {
//   title: "Ürün Detay",
// };

// dinamik bir metadata tanımı
export const generateMetadata = async ({ params }) => {
  const { productId } = await params;

  return { title: `Ürün ${productId} Detay` };
};

// Dynamic route olarak oluşturduğumuz sayfalarda url'deki parametre bileşene otomatik bir şekilde prop olarak gelir
const Detail = async ({ params }) => {
  const { productId } = await params;

  // eğer ürünün id'si 5'ten büyükse 404 sayfası yönlendir
  if (productId > 5) {
    notFound();
  }

  return (
    <div className="page">
      <h1 className="text-red-500">{productId} ID'li</h1>

      <h1>Ürün Detay Sayfası</h1>

      <Link href={`${productId}/reviews`} className="text-blue-400">
        Yorumları Gör
      </Link>
    </div>
  );
};

export default Detail;
