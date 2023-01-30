import { NextFunction, Request, Response } from "express";
import logging from "../config/logging";
import { Connect, PreparedQuery, Query } from "../config/mysql";

const NAMESPACE = "Unitats";
const getAllUnitats = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Getting all unitats");

    let query = "SELECT * FROM unitat";

    Connect().then((connection) => {
        Query(connection, query)
            .then((unitats) => {
                logging.info(NAMESPACE, 'Retrieved unitats: ', unitats);
                return res.status(200).json({
                    unitats
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

const getUnitatsByIdTreballador = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Getting unitat/s");
    const estat = 'ACTIU';
    const idTreballador = req.body.idTreballador;

    Connect().then((connection) => {
        let values = new Array<string>;
        let query = "SELECT nom FROM unitat WHERE estat = ? AND nom IN (SELECT unitat FROM rol WHERE idTreballador = ?)";
        values['0'] = estat;
        values['1'] = idTreballador;

        PreparedQuery(connection, query, values)
            .then((unitats) => {
                logging.info(NAMESPACE, 'Retrieved unitat/s: ', unitats);
                return res.status(200).json({
                    unitats
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

const insertUnitat = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Inserting unitat");
    const nom = req.body.nom;

    Connect().then((connection) => {
        let values = new Array<string>;
        let query = "INSERT INTO unitat (nom) VALUES (?)";
        values['0'] = nom;

        PreparedQuery(connection, query, values)
            .then((unitats) => {
                logging.info(NAMESPACE, 'Inserted unitats: ', unitats);
                return res.status(200).json({
                    message: `Unitat ${nom} insertada!`
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

const updateEstat = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Updating estat");
    const estat = req.body.estat;
    const nom = req.body.nom;

    Connect().then((connection) => {
        let values = new Array<string>;
        let query = "UPDATE unitat SET estat = ? WHERE nom = ?";
        values['0'] = estat;
        values['1'] = nom;

        PreparedQuery(connection, query, values)
            .then((estat) => {
                logging.info(NAMESPACE, 'Updated estat: ', estat);
                return res.status(200).json({
                    message: `Unitat ${nom} canviada d'estat`
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


export default { getAllUnitats, getUnitatsByIdTreballador, insertUnitat, updateEstat };