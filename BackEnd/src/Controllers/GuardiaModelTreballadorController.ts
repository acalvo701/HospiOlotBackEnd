import { NextFunction, Request, Response } from "express";
import logging from "../config/logging";
import { Connect, Query, PreparedQuery, BulkPreparedQuery } from "../config/mysql";

const NAMESPACE = "GuardiaModelTreballador";

const getNomsEsquemaByIdTreballador = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Getting esquema names");

    const idTreballador = req.query.idTreballador;
    Connect().then((connection) => {
        let values = new Array<any>;
        let query = "SELECT nomEsquema FROM guardiamodeltreballador WHERE idTreballador = ?";
        values['0'] = idTreballador;

        PreparedQuery(connection, query, values)
            .then((esquema) => {
                logging.info(NAMESPACE, 'Getting esquema names: ', esquema);
                return res.status(200).json({
                    esquema
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

const insertNomEsquemaByIdTreballador = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Inserting esquema name");

    const idTreballador = req.body.idTreballador;
    const nomEsquema = req.body.nomEsquema;

    Connect().then((connection) => {
        let values = new Array<string>;
        let query = "INSERT INTO guardiamodeltreballador (idTreballador, nomEsquema) VALUES (?,?)";
        values['0'] = idTreballador;
        values['1'] = nomEsquema;

        PreparedQuery(connection, query, values)
            .then((esquema) => {
                logging.info(NAMESPACE, 'Inserting esquema name: ', esquema);
                return res.status(200).json({
                    message: `Esquema name inserted!`
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

export default { getNomsEsquemaByIdTreballador, insertNomEsquemaByIdTreballador }