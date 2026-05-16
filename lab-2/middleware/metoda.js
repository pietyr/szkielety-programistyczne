const metoda = (req, res, next) => {
    const method = "Metoda: " + req.method
    const sciezka = "Ścieżka: " + req.protocol + "://" + req.get('host') + req.originalUrl
    console.log(method)
    console.log(sciezka)
    next()
}

module.exports = metoda