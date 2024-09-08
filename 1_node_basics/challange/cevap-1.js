// Soru
// 1) title dosyasını okuyun
// 2) content dosyasını okuyun
// 3) title dosyasındaki başlığa ve content dosyasındaki içeriğe sahip bir dosya oluşturun

const fs = require("fs");

const readTitle = fs.readFileSync("challenge/title.txt", "utf-8");

console.log("dosya okundu");

const readContent = fs.readFileSync("challenge/content.txt", "utf-8");

const connectText = `${readTitle} ${readContent}`;

fs.writeFileSync("challenge/output-3.txt", connectText);

console.log(readContent);
