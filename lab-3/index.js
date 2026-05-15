const express = require('express')
const path = require('path')
const app = express()
const PORT = 3000

// Parser dla danych z formularzy POST
app.use(express.urlencoded({ extended: false }))

app.get("/form", (req, res) => {
    res.sendFile(path.join(__dirname, "form.html"))
})

app.get("/form2", (req, res) => {
    res.sendFile(path.join(__dirname, "form2.html"))
})
app.post("/result", (req, res) => {
    let username = req.body.username
    let password = req.body.password
    
    if (!username || !password) {
        res.send("Uzupełnij dane!")
        return
    }
    
    res.send("Użytkownik: " + username + "<br>Hasło: " + password)
})

app.post("/form2-result", (req, res) => {
    let fullname = req.body.fullname
    let languages = req.body.languages
    
    // Jeśli nie zaznaczono żadnego języka, languages będzie undefined
    if (!languages) {
        languages = []
    }
    // Jeśli zaznaczono tylko jeden, Express zwraca string zamiast tablicy
    if (typeof languages === 'string') {
        languages = [languages]
    }
    
    let languagesList = languages.map(lang => `<li>${lang}</li>`).join('')
    
    res.send(`
        <h2>Użytkownik: ${fullname}</h2>
        <p>Znajomość języków:</p>
        <ul>
            ${languagesList}
        </ul>
    `)
})

app.listen(PORT, ()=> console.log(`Serwer działa na porcie ${PORT}`))