import jwt = require("jsonwebtoken")

class Token {
    refreshTokens:Array<string>;
    refreshToken:string;
    accessToken:string;
    secret:string;

    constructor() {
        this.refreshTokens = new Array();
        this.secret = process.env.ACCESS_TOKEN_SECRET
    }

    generateAccessToken(user) {
        this.accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "2h"}) 
    }

    generateRefreshToken(user) {
        this.refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "3h"})
        this.refreshTokens.push(this.refreshToken);
    }

    eliminarRefreshToken(token) {
        this.refreshTokens = this.refreshTokens.filter( t => t != token);
    }
}

export = Token;