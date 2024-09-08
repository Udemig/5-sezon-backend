//* FS modülünü bu dosyaya çağırma (import etme)
const fs = require("fs");

//* FS (FileSystem)
//* Node.js modüllerden bir tanesi
//* Sahip olduğu modüller sayesinde dosya dizininde işlemler yapabilcez.
//* Dosya Oluşturma / Silme  / Okuma / Yazma

//* 1) Dosya Okuma
const text = fs.readFileSync("./data/örnek.txt", "utf-8");
console.log("Dosya okuma bitti");

//* 2) Dosya Yazma
//* Gönderilcek metin içeriğini hazrıla
const newText = `
Bugün avakado hakkında edindiğim bilgiler bunlardı:
${text}
 
Oluşturma Tarihi:
${new Date().toLocaleDateString()}
`;

//* output isminde varolan dosya yoksa yenisini oluşturup içeriğini belirler
fs.writeFileSync("./data/output.txt", newText);
console.log("Dosya yazma bitti");

//* 3) Dosya Silme
fs.unlinkSync("./data/bozuk.txt");
console.log("Dosya silma bitti");

//* 4) Dizin (Klasör) Oluşturma
fs.mkdirSync("challange");
console.log("Klasör oluştuma bitti");

//* 5) Dosya / Dizinin ismini değiştirme
fs.renameSync("challange", "zorluk");
console.log("İsim değiştirme bitti");
