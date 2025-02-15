const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Health Check Endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server sağlıklı", timestamp: new Date().toISOString() });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server ${PORT}. portta çlışıyor`);
});
