// api isteği atmışız gibi belirli bir süre sonra cevap döndüren fonksiyon yazalım

export async function delay(ms = 2000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
