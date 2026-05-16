const isAuthorized = (req, res, next) => {
    const password = req.headers.password
    if (password === 'secretpaswd') {
        next()
    } else {
        res.status(401).json({ msg: 'Dostęp zabroniony' })
    }
}

module.exports = isAuthorized