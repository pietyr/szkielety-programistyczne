const express = require('express')
const path = require('path')
const { check, validationResult } = require('express-validator')
const users = require('./users')
const app = express()
const PORT = 3000

// Parser dla danych z formularzy POST
app.use(express.urlencoded({ extended: false }))

// Parser dla żądania JSON
app.use(express.json());

// Zadanie 1.10

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

// Zadanie 1.11

app.get("/validation-form", (req, res) => {
    res.sendFile(path.join(__dirname, "form_validation.html"))
})

// Własna metoda oczyszczająca
const createInitials = value => {
    return value
        .trim()
        .split(/\s+/)
        .map(word => word.charAt(0).toUpperCase())
        .join('')
}

app.post("/form", [
    check('nazwisko')
        .isLength({ min: 3, max: 25 })
        .withMessage('Nazwisko musi mieć od 3 do 25 znaków')
        .isAlpha('pl-PL')
        .withMessage('Nazwisko może zawierać tylko litery')
        .trim()
        .stripLow(),

    check('email')
        .isEmail()
        .withMessage('Email jest niepoprawny')
        .trim()
        .normalizeEmail()
        .bail(),

    check('wiek')
        .isNumeric()
        .withMessage('Wiek musi być liczbą')
        .custom(value => {
            const age = parseInt(value)
            if (age < 0 || age > 110) {
                throw new Error('Wiek musi być w zakresie 0-110 lat')
            }
            return true
        })
        .trim()
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    let nazwisko = req.body.nazwisko
    const email = req.body.email
    const wiek = req.body.wiek

    const initials = createInitials(nazwisko)

    res.send(`
        <h2>Dane użytkownika:</h2>
        <p>Nazwisko: ${nazwisko}</p>
        <p>Inicjały: ${initials}</p>
        <p>Email: ${email}</p>
        <p>Wiek: ${wiek}</p>
    `)
})

// Zadanie 1.12

app.get('/api/users', (req, res) => {
    res.json(users)
})

app.get('/api/users/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))
    if (found) {
        res.json(users.filter(user => user.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({ msg: `Użytkownik o id ${req.params.id} nie został odnaleziony` })
    }
})

app.post('/api/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        status: "aktywny"
    }
    if (!newUser.name || !newUser.email) {
        return res.status(400).json({ msg: 'Wprowadź poprawne imię i nazwisko oraz email!' })
    }
    users.push(newUser)
    res.json(users)
})

app.patch('/api/users/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))
    if (found) {
        const updUser = req.body
        users.forEach(user => {
            if (user.id === parseInt(req.params.id)) {
                user.name = updUser.name ? updUser.name : user.name
                user.email = updUser.email ? updUser.email : user.email
                user.status = updUser.status ? updUser.status : user.status
                res.json({ msg: 'Dane użytkownika zaktualizowane', user })
            }
        })
    } else {
        res.status(400).json({ msg: `Użytkownik o id ${req.params.id} nie istnieje!` })
    }
})

app.delete('/api/users/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))
    if (found) {
        const deletedUser = users.filter(user => user.id === parseInt(req.params.id))
        // Filtruj tablicę, usuwając użytkownika z danym ID
        users.splice(users.findIndex(user => user.id === parseInt(req.params.id)), 1)
        res.json({ msg: 'Użytkownik usunięty', user: deletedUser })
    } else {
        res.status(400).json({ msg: `Użytkownik o id ${req.params.id} nie istnieje!` })
    }
})


app.listen(PORT, ()=> console.log(`Serwer działa na porcie ${PORT}`))