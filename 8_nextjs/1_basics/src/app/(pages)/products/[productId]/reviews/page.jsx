import Link from "next/link";

const Reviews = async ({ params }) => {
  const { productId } = await params;

  return (
    <div className="page">
      <h1>{productId} ID'li Ürünün</h1>
      <h1>Yorumlar Sayfası</h1>

      <Link href="reviews/1">Yorum - 1</Link>
      <Link href="reviews/2">Yorum - 2</Link>
      <Link href="reviews/3">Yorum - 3</Link>
      <Link href="reviews/4">Yorum - 4</Link>
    </div>
  );
};

export default Reviews;
