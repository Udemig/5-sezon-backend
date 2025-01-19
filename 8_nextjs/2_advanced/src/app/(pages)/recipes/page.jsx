import { getRecipes } from "../../utils/service";
import Image from "next/image";
import Link from "next/link";

// SSG (Static Site Generation) ile bu sayfa buil anında bir kere oluşturulur ve her sayfaya girildiğinde build anında oluşturulan html indirip kullanılır. Bu değeri export etmemiz sayesinde bu sayfa oluşturulduktan sonra 60 saniye boyunca cache tutulması gerektiğini 60. saniyenin ardından eğer birdaha bu sayfaya girilirse sayfa içeriğini tekrardan oluşturulması gerektiğini söylüyoruz
//! export const revalidate = 60;

// Statik olan bir sayfayı dinamik sayfay yapar yani sayfayı build anında oluşturmaz kullanıcı her girdiğinde tekrar oluşturur
//! export const dynamic = "force-dynamic";

// Server Component - Static Sayfa
const Recipes = async () => {
  // fonksiyonu tetikliyoruz
  const data = await getRecipes();

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">Tarifler</h1>

      {data.recipes.map((item) => (
        <Link
          href={`/recipes/${item.id}`}
          key={item.id}
          className="flex gap-4 mt-5 p-2 rounded-md border"
        >
          <Image src={item.image} alt={item.name} width={150} height={150} />

          <div>
            <h1 className="text-2xl">{item.name}</h1>
            <h2>{item.cuisine}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Recipes;
