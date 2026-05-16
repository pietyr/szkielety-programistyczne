const express = require("express")
const path = require("path")
const handleBars = require("handlebars")
const exphbs = require("express-handlebars")
const {allowInsecurePrototypeAccess} = require("@handlebars/allow-prototype-access")
const app = express()
app.use(express.urlencoded({
    extended: true
}))
app.set("views", path.join(__dirname, "/"))
app.engine(
    "hbs",
    exphbs.engine({
        handlebars: allowInsecurePrototypeAccess(handleBars),
        extname: "hbs",
        defaultLayout: "layout",
        layoutsDir: __dirname,
    })
)
app.set("view engine", "hbs")
app.listen(3000, () => {
    console.log("Serwer nasłuchuje na porcie 3000")
})