const express = require("express");
const proxy = require("express-http-proxy");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Client istek atarken sürekli farklı domain / portlara istek atmasının önnüe geçmek için PROXY kullanarak client'ın 8000. porta gelen isteklerini endpointe bağlı olarak farklı portlarda çalışan api'lara yönlendirdik
app.use("/customer", proxy("http://localhost:8002"));
app.use("/shopping", proxy("http://localhost:8004"));
app.use("/", proxy("http://localhost:8003"));

app.listen(8000, () => {
  console.log("Gateway API 8000. portta çalışıyor");
});
