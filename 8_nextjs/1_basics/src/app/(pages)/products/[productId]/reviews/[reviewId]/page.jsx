import Link from "next/link";

const ReviewDetail = async ({ params }) => {
  const { reviewId, productId } = await params;

  return (
    <div className="page">
      <h1 className="text-red-400">{productId} ID'li Ürünün</h1>
      <h1 className="text-yellow-400">{reviewId} ID'li Yormunun</h1>
      <h1>Detay Sayfası</h1>

      <Link href="." className="text-blue-400">
        Geri
      </Link>
    </div>
  );
};

export default ReviewDetail;
