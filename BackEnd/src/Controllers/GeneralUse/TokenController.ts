import { NextFunction, Request, Response } from "express";
import logging from "../../config/logging";
import { Connect, Query, PreparedQuery } from "../../config/mysql";
import bcrypt = require("bcrypt");
import jwt = require("jsonwebtoken");
import User = require("../../Model/Entities/User");
import Token = require("../../Model/Entities/Token");
import jwt_decode from "jwt-decode";
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from "jsonwebtoken";
const token = new Token();
const NAMESPACE = "Treballadors";

const login = (async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Logging in");
    const dni = req.body.dni;
    const password = (req.body.password);

    Connect().then((connection) => {
        let values = new Array<string>;
        let query = "SELECT id,dni,nom,password,categoria,estat, (SELECT id IN (SELECT rol.idTreballador from rol)) AS 'isAdmin' FROM hospiolot.treballador WHERE dni = ?;";
        values['0'] = dni;
        PreparedQuery(connection, query, values)
            .then(async (treballador) => {
                logging.info(NAMESPACE, 'Retrieved treballador: ', treballador);


                if (treballador === null || treballador === undefined || (Array.isArray(treballador) && treballador.length === 0)) {
                    res.status(401).send("Usuari o password no vàlid")
                } else {
                    console.log(password);
                    if (await bcrypt.compare(password, treballador[0]['password'])) {
                        treballador = treballador[0];
                        token.generateAccessToken({ isAdmin: treballador['isAdmin'], dni: treballador['dni'], categoria: treballador['categoria'], nom: treballador['nom'], id: treballador['id'] });
                        token.generateRefreshToken({ isAdmin: treballador['isAdmin'], dni: treballador['dni'], categoria: treballador['categoria'], nom: treballador['nom'], id: treballador['id'] });
                        res.json({ accessToken: token.accessToken, refreshToken: token.refreshToken })
                    } else {
                        res.status(401).send("Dades incorrectes")
                    }


                }

            })
            .catch(error => {
                logging.error(NAMESPACE, error.message, error);

                return res.status(500).json({
                    error
                })
            }).finally(() => {
                connection.end();
            })
    }).catch(error => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(500).json({
            error
        })
    })

});

const validateToken = (async (req, res, next) => {
    if (!req.headers["authorization"]) {
        res.status(400).send("Token not present");
    } else {
        const accessToken = req.headers["authorization"].split(" ")[1];
        if (accessToken == null) {
            res.status(400).send("Token not present")
        } else {
            jwt.verify(accessToken, token.secret, (err, user) => {
                if (err) {
                    res.status(403).send("Token invalid")
                }
                else {
                    req.user = user
                    next();
                }
            })
        }
    }


})

const validateTokenAdmin = (async (req, res, next) => {

    if (!req.headers["authorization"]) {
        res.status(400).send("Token not present");
    } else {
        const accessToken = req.headers["authorization"].split(" ")[1];
        if (accessToken == null) {
            res.sendStatus(400).send("Token not present")
        } else {
            jwt.verify(accessToken, token.secret, (err, user) => {
                if (err) res.status(403).send("Token invalid")
                else {
                    const isAdmin = user.isAdmin;
                    if (!isAdmin) {
                        res.status(403).send("Not admin")
                    } else {
                        req.user = user
                        next();
                    }

                }
            })
        }
    }

})


const refreshToken = (async (req, res) => {
    const refreshTokenValue = req.body.refreshToken;

    await jwt.verify(refreshTokenValue, process.env.REFRESH_TOKEN_SECRET || '', (err: any, user: any) => {
        if (err instanceof TokenExpiredError) {
            res.status(401).send({ success: false, message: 'Unauthorized! Access Token was expired!' });
        } else if (err instanceof NotBeforeError) {
            res.status(401).send({ success: false, message: 'jwt not active' });
        }
        else if (err instanceof JsonWebTokenError) {
            res.status(401).send({ success: false, message: 'jwt malformed' });
        } else if (err) {
            res.status(401).send({ success: false, message: 'Token invalid' });
        } else {
            var info = { isAdmin: user['isAdmin'], dni: user['dni'], categoria: user['categoria'], nom: user['nom'], id: user['id'] };
            token.generateAccessToken(info);
            token.generateRefreshToken(info);

            res.json({ accessToken: token.accessToken, refreshToken: token.refreshToken })
        }

    });


});

// const validateIsAdmin = (async (req, res, next) => {
//     const idTreballador = req['user'].id;


//     else{
//         next();
//     }

//     })
export default { login, validateToken, refreshToken, validateTokenAdmin };