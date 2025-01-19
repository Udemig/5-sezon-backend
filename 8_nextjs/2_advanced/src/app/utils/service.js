// Next.js varsayılan olarak bütün api isteklerinden gelen cevabı cache'ler ama bazı durumlarda sıklıkla güncellene veriler olduğunda (borsa verisi) her api isteğininin gerçektende api atılmasını ve verinin cache tutulmamasını isteyebiliriz

// Verileri çeken fonksiyon
export const getRecipes = async () => {
  const res = await fetch("https://dummyjson.com/recipes");

  if (!res.ok) throw new Error("Tarif verisi alınamadı");

  return await res.json();
};

export const getRecipe = async (id) => {
  const res = await fetch(`https://dummyjson.com/recipes/${id}`);

  if (!res.ok) throw new Error("Tarif bulunamadı");

  return await res.json();
};
