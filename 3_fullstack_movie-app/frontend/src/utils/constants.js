export const inputs = [
  { name: "title", label: "Başlık" },
  { name: "description", label: "Açıklama" },
  { name: "rating", label: "Puan", type: "number", min: 1, max: 10 },
  { name: "year", label: "Yıl", type: "number", min: 1800, max: 2025 },
  { name: "director", label: "Yapımcı" },
  { name: "duration", label: "Süre", type: "number" },
  { name: "language", label: "Dil" },
  { name: "cast", label: "Ekip ( , ile ayırınız)" },
  { name: "genre", label: "Kategoriler ( , ile ayırınız)" },
];
