const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Prosty serwer oparty na szkielecie programistycznym Express!");
});

app.get("/about", (req, res) => {
  res.send("Autor strony: Piotr Kisiel");
});

app.get("/name/:imie", (req, res) => {
  const imie = req.params.imie;
  res.status(200).type("text/html").send(`Cześć ${imie}`);
});

app.get("/name/:imie/:drugie_imie", (req, res) => {
  const imie = req.params.imie;
  const drugie_imie = req.params.drugie_imie;
  res.status(200).type("text/html").send(`Cześć ${imie} i ${drugie_imie}`);
});

app.listen(port, () => {
  console.log(`Serwer działa na porcie: ${port}`);
});
