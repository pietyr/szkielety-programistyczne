const express = require("express");
const path = require("path");
const handleBars = require("handlebars");
const exphbs = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

// Połączenie z bazą danych
require("./db");

const app = express();

// Obsługa danych z formularzy (URL-encoded)
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// Konfiguracja silnika szablonów Handlebars
app.set("views", path.join(__dirname, "views"));
app.engine(
  "hbs",
  exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(handleBars),
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: path.join(__dirname, "views/layouts"),
  }),
);
app.set("view engine", "hbs");

// Obsługa favicon.ico (aby zapobiec niepotrzebnym zapytaniom do routera)
app.get("/favicon.ico", (req, res) => res.status(204).end());

// Import i montowanie kontrolera studentów
const studentController = require("./controllers/StudentController");
app.use("/", studentController);

// Uruchomienie serwera
app.listen(3000, () => {
  console.log("Serwer nasłuchuje na porcie 3000");
});
