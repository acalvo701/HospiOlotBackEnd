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
                    unitats
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
                    estat
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


export default { getAllUnitats, insertUnitat, updateEstat};