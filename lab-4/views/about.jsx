const React = require('react')

const About = (props) => {
    return (
        <html>
        <head>
            <title>Informacje</title>
        </head>
        <body>
        <h1>Dane użytkownika</h1>
        <p><b>Nazwisko:</b> {props.nazwisko}</p>
        <p><b>Email:</b> {props.email}</p>
        <p><b>Wiek:</b> {props.wiek}</p>
        <p><b>Inicjały:</b> {props.initials}</p>
        </body>
        </html>
    )
}

module.exports = About