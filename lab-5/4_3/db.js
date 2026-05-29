const mongoose = require("mongoose");

// Pobieranie URI z pliku .env (z fallbackiem do bazy lokalnej w celach testowych)
const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/StudentDB";

mongoose
  .connect(mongoURI)
  .then((result) => {
    if (process.env.MONGODB_URI) {
      console.log("Połączono z bazą danych w chmurze MongoDB Atlas");
    } else {
      console.log("Połączono z lokalną bazą danych (brak MONGODB_URI w .env)");
    }
  })
  .catch((err) => {
    console.log("Nie można połączyć się z MongoDB. Błąd: " + err);
  });
