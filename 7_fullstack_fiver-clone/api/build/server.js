import express from "express";
const app = express();
const port = 3000;
app.get("/", (req, res) => {
    res.send("Serverdan MerhabalarR");
});
app.listen(port, () => {
    console.log(`🎾 Server ${port}. portu dinlemeye başladı`);
});
