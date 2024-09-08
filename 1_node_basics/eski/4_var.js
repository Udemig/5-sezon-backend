const path = require("node:path");

const text = "./data/örnek.txt";

// Dosya dizinide kullanıalbilcek methodlar
console.log("dirname()", path.dirname(text));
console.log("basename()", path.basename(text));
console.log("extname()", path.extname(text));

// İki veya daha fazla yolu birleştirir
console.log("join()", path.join("/media", "photos", "profile.png"));

// Dosyanın mutlak konumunu verir
console.log("resolve()", path.resolve("örnek.txt"));

// Yolu en basit hale getirir
console.log("normalize()", path.normalize("/users/evin/.././deneme.txt"));
