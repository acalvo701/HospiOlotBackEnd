import bcrypt = require("bcrypt");
import jwt = require("jsonwebtoken")
const User = require("../Model/Entities/User.ts");
const Token = require("../Model/Entities/Token.ts");
const users:Array<User> = new Array();
const token = new Token();

const createUser = (async (req, res) => {
    const userName:string = req.body.name;
    const hashedPassword:string = await User.encrypt(req.body.password);

    users.push(new User(userName, hashedPassword));
    res.status(201).send(users);
})

const login = (async (req, res) => {
    const user = users.find(usuari => usuari.name == req.body.name)

    if (user === null || user === undefined) {
        res.status(404).send("Usuari o password no vàlid")
    } else {
        if (await bcrypt.compare(req.body.password, user.password)) {
            token.generateAccessToken({ user: req.body.name });
            token.generateRefreshToken({ user: req.body.name });
            res.json({ accessToken: token.accessToken, refreshToken: token.refreshToken })
        } else {
            res.status(401).send("Dades incorrectes")
        }

        res.status(201).send(users);
    }


})

const validateToken = (async (req, res, next) => {
    console.log(req.headers["authorization"]);
    const accessToken = req.headers["authorization"].split(" ")[1];
    if (accessToken == null) {
        res.sendStatus(400).send("Token not present")
    } else {
        jwt.verify(accessToken, token.secret, (err, user) => {
            if (err) res.status(403).send("Token invalid")
            else {
                req.user = user
                next();
            }
        })
    }
    console.log("Validate token")
    console.log(accessToken)

})


const authenticated = (async (req, res) => {
    console.log(req.user)
    res.send(`${req.user.user} is valid`)
})

const refreshToken = (async (req, res) => {
    if (!token.refreshTokens.includes(req.body.token)) {
        res.status(400).send("Refresh token invalid");
    } else {
        token.eliminarRefreshToken(req.body.token);

        token.generateAccessToken(({ user: req.body.name }))
        token.generateRefreshToken({ user: req.body.name })

        res.json({ accessToken: token.accessToken, refreshToken: token.refreshToken })
    }
})

module.exports = {
    createUser,
    login,
    authenticated,
    validateToken,
}
