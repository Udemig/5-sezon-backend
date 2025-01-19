import { getRecipe, getRecipes } from "@/app/utils/service";

import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

// Next.js 13 öncesinde generateStaticParams'In görevini yaparlar
// getStaticPaths
// getStaticProps

// Bu detay sayfasının alabilceği parametlerin listesini döndürücez bu sayede bu dinamik detay sayfasını listedki her bir parametre için statik bir versiyonunu oluşturucaz
export async function generateStaticParams() {
  // tarif verilerini al
  const data = await getRecipes();

  // tariflerin id'sinden bir dizi oluştur
  return data.recipes.map((recipe) => ({ id: String(recipe.id) }));
}

// Server Component - Dinamik bir sayfa
const Page = async ({ params }) => {
  // url'den parametreyi
  const { id } = await params;

  // parametreye göre tarif detaylarını al
  const recipe = await getRecipe(id);

  return (
    <div className="p-10">
      <Link href="/recipes">Geri</Link>

      <h1 className="text-2xl my-10">Ürün Detay Sayfası</h1>

      <div className="flex gap-4 mt-5 p-2 rounded-md border">
        <Image src={recipe.image} alt={recipe.name} width={150} height={150} />

        <div>
          <h1 className="text-2xl">{recipe.name}</h1>
          <h2>{recipe.cuisine}</h2>
        </div>
      </div>
    </div>
  );
};

export default Page;
