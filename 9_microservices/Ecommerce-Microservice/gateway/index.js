const express = require("express");
const httpProxy = require("http-proxy");
require("dotenv").config();

const proxy = httpProxy.createProxyServer({});
const app = express();

// gerekli yönlendirmeleri yap
app.use("/api/auth", (req, res) => {
  proxy.web(req, res, { target: process.env.AUTH_SERVICE_URL });
});

app.use("/api/products", (req, res) => {
  proxy.web(req, res, { target: process.env.PRODUCT_SERVICE_URL });
});

app.use("/api/orders", (req, res) => {
  proxy.web(req, res, { target: process.env.ORDER_SERVICE_URL });
});

// gateway'i ayağa kaldır
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API Gateway ${port} portunda çalışıyor `);
});
