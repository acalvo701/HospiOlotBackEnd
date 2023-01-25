import { NextFunction, Request, Response } from "express";
import logging from "../config/logging";
import { Connect, Query, PreparedQuery } from "../config/mysql";
import bcrypt = require("bcrypt");
import jwt = require("jsonwebtoken");
import User = require("../Model/Entities/User");
import Token = require("../Model/Entities/Token");
import Treballador = require("../Model/Entities/Treballador");

const token = new Token();
const NAMESPACE = "Treballadors";

const getTreballador = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Getting treballador");
    const id = req.body.id;
   
    Connect().then((connection) => {
        let values = new Array<string>;
        let query = "SELECT * FROM treballador WHERE id = ?";
        values['0'] = id;

        PreparedQuery(connection, query, values)
            .then((treballador) => {
                logging.info(NAMESPACE, 'Retrieved treballador: ', treballador);
                return res.status(200).json({
                    treballador
                });
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
};

const getAllTreballadors = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Getting all treballadors");

    let query = "SELECT * FROM treballador";

    Connect().then((connection) => {
        Query(connection, query)
            .then((treballadors) => {
                logging.info(NAMESPACE, 'Retrieved treballadors: ', treballadors);
                return res.status(200).json({
                    treballadors
                });
            })
            .catch(errorQuery => {
                logging.error(NAMESPACE, errorQuery.message, errorQuery);

                return res.status(500).json({
                    message: errorQuery.message,
                    errorQuery
                })
            }).finally(() => {
                connection.end();
            })
    }).catch(errorConnection => {
        logging.error(NAMESPACE, errorConnection.message, errorConnection);

        return res.status(500).json({
            message: errorConnection.message,
            errorConnection
        })
    })

};

const insertTreballador = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Inserting treballador");
    const dni = req.body.dni;
    const nom = req.body.nom;
    const password = req.body.password;
    const categoria = req.body.categoria;

    Connect().then((connection) => {
        let values = new Array<string>;
        let query = "INSERT INTO treballador (dni,nom,password,categoria) VALUES (?,?,?,?)";
        values['0'] = dni;
        values['1'] = nom;
        values['2'] = password;
        values['3'] = categoria;

        PreparedQuery(connection, query, values)
            .then((treballador) => {
                logging.info(NAMESPACE, 'Inserted treballador: ', treballador);
                return res.status(200).json({
                    message: `Treballador insertat!`
                });
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
};

const updateTreballador = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Updating treballador");
    
    const dni = req.body.dni;
    const nom = req.body.nom;
    const password = req.body.password;
    const categoria = req.body.categoria;
    const estat = req.body.estat;
    const id = req.body.id;

    Connect().then((connection) => {
        let values = new Array<string>;
        let query = "UPDATE treballador SET dni = ?, nom = ?, password = ?, categoria = ?, estat = ? WHERE id = ?";
        values['0'] = dni;
        values['1'] = nom;
        values['2'] = password;
        values['3'] = categoria;
        values['4'] = estat;
        values['5'] = id;

        PreparedQuery(connection, query, values)
            .then((treballador) => {
                logging.info(NAMESPACE, 'Updated treballador: ', treballador);
                return res.status(200).json({
                    message: `Treballador ${id} canviat`
                });
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

};

const login = (async (req: Request, res: Response, next: NextFunction) => {

        logging.info(NAMESPACE, "Logging in");
        const dni = req.query.dni;
        const password = User.encrypt(req.query.password);
        Connect().then((connection) => {
            let values = new Array<any>;
            let query = "SELECT * FROM treballador WHERE dni = ?";
            values['0'] = dni;
            PreparedQuery(connection, query, values)
                .then(async (treballador) => {
                    logging.info(NAMESPACE, 'Retrieved treballador: ', treballador);
                    console.log(treballador[0]['password']);
                    
                    if (treballador === null || treballador === undefined) {
                        res.status(404).send("Usuari o password no vàlid")
                    } else {
                        
                        if (await bcrypt.compare( password, treballador['password'])) {
                            token.generateAccessToken({ user: dni });
                            token.generateRefreshToken({ user: dni });
                            res.json({ accessToken: token.accessToken, refreshToken: token.refreshToken })
                        } else {
                            res.status(401).send("Dades incorrectes")
                        }
                
                        // res.status(201).send(users);
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

    const token = req.body.token;
    const dni = req.body.dni;

    if (!token.refreshTokens.includes(token)) {
        res.status(400).send("Refresh token invalid");
    } else {
        token.eliminarRefreshToken(token);

        token.generateAccessToken(({ user: dni }))
        token.generateRefreshToken({ user: dni })

        res.json({ accessToken: token.accessToken, refreshToken: token.refreshToken })
    }
})

export default { login,authenticated,validateToken,getTreballador, getAllTreballadors, insertTreballador, updateTreballador };