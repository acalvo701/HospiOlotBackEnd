import { NextFunction, Request, Response } from "express";
import logging from "../../config/logging";
import { Connect, Query, PreparedQuery } from "../../config/mysql";

const NAMESPACE = "Guardies";


const getGuardiesByDayAdmin = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "Getting guardies from specified day");
    const data = req.query.data;
    const idTreballador = req.query.idTreballador;

    Connect().then((connection) => {
        let values = new Array<any>;
        let query = `SELECT guardia.id,guardia.categoria,guardia.unitat,torn,dia,numeroPlaces,guardiatreballador.idGuardia,guardiatreballador.idTreballador,treballador.nom,guardiatreballador.estat as 'estatTreballador'
        FROM guardia LEFT JOIN guardiatreballador ON guardiatreballador.idGuardia = guardia.id LEFT JOIN treballador ON treballador.id = guardiatreballador.idTreballador 
        WHERE guardia.unitat IN (SELECT rol.unitat FROM rol WHERE rol.idTreballador = ?) AND   dia = ? AND guardia.estat = 'ACTIU'
        AND (guardiatreballador.estat NOT IN ('CANCELADA') OR isnull(guardiatreballador.estat))
        `;
        values['0'] = idTreballador;
        values['1'] = data;
        
        PreparedQuery(connection, query, values)
            .then((guardies) => {
                logging.info(NAMESPACE, 'Retrieved guardies: ', guardies);
                return res.status(200).json({
                    guardies
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

const getTreballadorsFromGuardiaAdmin = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Getting treballadors from guardia");

    const idGuardia = req.query.idGuardia;

    Connect().then((connection) => {
        let values = new Array<any>;
        let query = "SELECT nom,gt.estat FROM treballador LEFT JOIN guardiatreballador gt ON treballador.id = gt.idTreballador WHERE gt.idGuardia = ?";
        values['0'] = idGuardia;

        PreparedQuery(connection, query, values)
            .then((treballadors) => {
                logging.info(NAMESPACE, 'Treballador: ', treballadors);
                return res.status(200).json({
                    treballadors
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

const insertGuardia = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Inserting guardia");
    const categoria = req.body.categoria;
    const unitat = req.body.unitat;
    const torn = req.body.torn;
    const dia = req.body.dia;
    const numeroPlaces = req.body.numeroPlaces;

    Connect().then((connection) => {
        let values = new Array<string>;
        let query = "INSERT INTO guardia (categoria,unitat,torn,dia,numeroPlaces) VALUES (?,?,?,?,?)";
        values['0'] = categoria;
        values['1'] = unitat;
        values['2'] = torn;
        values['3'] = dia;
        values['4'] = numeroPlaces;

        PreparedQuery(connection, query, values)
            .then((guardia) => {
                logging.info(NAMESPACE, 'Inserted guardia: ', guardia);
                return res.status(200).json({
                    message: `Guardia insertada!`
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

const updateGuardia = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Updating guardia");

    const categoria = req.body.categoria;
    const unitat = req.body.unitat;
    const torn = req.body.torn;
    const dia = req.body.dia;
    const numeroPlaces = req.body.numeroPlaces;
    const estat = req.body.estat;
    const id = req.body.id;
    Connect().then((connection) => {
        let values = new Array<string>;
        let query = "UPDATE guardia SET categoria = ?, unitat = ?, torn = ?, dia = ?, numeroPlaces = ?, estat = ? WHERE id = ?";
        values['0'] = categoria;
        values['1'] = unitat;
        values['2'] = torn;
        values['3'] = dia;
        values['4'] = numeroPlaces;
        values['5'] = estat;
        values['6'] = id;

        PreparedQuery(connection, query, values)
            .then((guardia) => {
                logging.info(NAMESPACE, 'Updated guardia: ', guardia);
                return res.status(200).json({
                    message: `Guardia ${id} canviada`
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

const updateEstatGuardiaAdmin = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Updating estat de la guardia");

    const estat = req.body.estat;
    const id = req.body.id;

    Connect().then((connection) => {
        let values = new Array<string>;
        let query = "UPDATE guardia SET estat = ? WHERE id = ?";
        values['0'] = estat;
        values['1'] = id;

        PreparedQuery(connection, query, values)
            .then((guardia) => {
                logging.info(NAMESPACE, 'Updated estat de la guardia: ', guardia);
                return res.status(200).json({
                    message: `Estat de la guardia ${id} canviada a ${estat}`
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

export default { getGuardiesByDayAdmin, getTreballadorsFromGuardiaAdmin, insertGuardia, updateGuardia, updateEstatGuardiaAdmin };