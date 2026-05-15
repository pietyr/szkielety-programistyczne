const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Prosty serwer oparty na szkielecie programistycznym Express!");
});

app.get("/about", (req, res) => {
  res.send("Autor strony: Piotr Kisiel");
});

app.listen(port, () => {
  console.log(`Serwer działa na porcie: ${port}`);
});
