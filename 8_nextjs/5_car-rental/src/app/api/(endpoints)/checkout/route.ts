import Stripe from "stripe";
import { ICar } from "../../models/Car";
import generateImage from "@/app/utils/generateImage";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  typescript: true,
});

// Katalog'daki aktif ürünleri alıp getirir
const getActiveProducts = async () => {
  let stripeProducts = await stripe.products.list();
  return stripeProducts.data.filter((i) => i.active);
};

// Ödeme Oturmunu Oluştur
export async function POST(req: Request) {
  //1) isteğin body kısmında gelen araça bilgilerini al
  const car: ICar = await req.json();

  //2) stripe katalog'una kaydedilmiş ürünleri al
  const stripeProducts = await getActiveProducts();

  //3) satın alınacak ürün katalog'da var mı kontrol et
  let foundProduct = stripeProducts.find(
    (i) => i.metadata.product_id === car._id
  );

  //4) eğer katalog'da yoksa ürünü katalog'a ekle
  // todo stripe'a ürün ekleniyor
  if (!foundProduct) {
    foundProduct = await stripe.products.create({
      name: car.make + " " + car.model,
      description: car.description,
      images: [generateImage(car.make, car.model, "sur1", "1")],
      default_price_data: {
        unit_amount: car.price * 100,
        currency: "TRY",
      },
      metadata: {
        product_id: car._id,
      },
    });
  }

  //5) ürünün stripe tarafından oluşturulan id'sini ve satın alınacak ürün miktarını bir nesne haline getir

  //6) ödeme oturumu (url) oluştur

  //7) ödeme oturumu url'ini client'a gönder
  return NextResponse.json({ url: "url" });
}
