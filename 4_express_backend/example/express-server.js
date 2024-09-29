const express = require("express");
const cors = require("cors");

// bir api oluştur
const app = express();

// middelware (cors hatalarını çözmek için doğru headerlar gönderir)
app.use(cors());

// '/' adresine gelen get isteklerine cevap ver
app.get("/", (req, res) => {
  res.json({ message: "Serverdan merhabalar" });
});

app.post("/new", (req, res) => {
  res.status(201).json({ message: "ürün oluşturuldu" });
});

// hangi porttan gelen sitekler dinlenicek ?
const port = 3002;
app.listen(port, () => {
  console.log(`Server ${port}. port'a gelen istekleri dinliyor`);
});
