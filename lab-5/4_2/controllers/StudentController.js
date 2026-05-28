const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// Ekran główny powitalny
router.get("/", (req, res) => {
  res.send(`
    <h3 style="text-align:center">Baza danych studentów</h3>
    <h4 style="text-align:center">Kliknij <a href="/list"> tutaj</a>, aby uzyskać dostęp do bazy.</h4>
  `);
});

// Listing studentów
router.get("/list", (req, res) => {
  Student.find()
    .then((docs) => {
      res.render("list", {
        list: docs,
      });
    })
    .catch((err) => {
      console.log("Błąd pobierania danych" + err);
    });
});

// Formularz dodawania nowego studenta
router.get("/addOrEdit", (req, res) => {
  res.render("addOrEdit", {
    viewTitle: "Dodaj studenta",
  });
});

// Obsługa zapisu (dodawanie lub aktualizacja)
router.post("/", (req, res) => {
  if (req.body._id == "") {
    insert(req, res);
  } else {
    update(req, res);
  }
});

// Edycja istniejącego studenta
router.get("/:id", (req, res) => {
  Student.findById(req.params.id)
    .then((doc) => {
      res.render("addOrEdit", {
        viewTitle: "Zaktualizuj dane studenta",
        student: doc,
      });
    })
    .catch((err) => {
      console.log("Błąd podczas akutalizowania danych" + err);
    });
});

// Usuwanie studenta
router.get("/delete/:id", (req, res) => {
  Student.findByIdAndDelete(req.params.id)
    .then((doc) => {
      res.redirect("/list");
    })
    .catch((err) => {
      console.log("Błąd podczas usuwania: " + err);
    });
});

// Funkcje pomocnicze z listingu 4.4
async function insert(req, res) {
  let student = new Student();
  student.fullName = req.body.fullName;
  student.email = req.body.email;
  student.mobile = req.body.mobile;
  student.city = req.body.city;
  try {
    await student.save();
    res.redirect("/list");
  } catch (err) {
    console.log("Błąd podczas dodawania studenta: " + err);
  }
}

async function update(req, res) {
  try {
    await Student.findOneAndUpdate({ _id: req.body._id }, req.body, {
      new: true,
    });
    res.redirect("/list");
  } catch (err) {
    console.log("Błąd podczas aktualizowania danych: " + err);
  }
}

module.exports = router;
