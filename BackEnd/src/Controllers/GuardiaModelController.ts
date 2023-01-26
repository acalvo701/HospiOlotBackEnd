import { NextFunction, Request, Response } from "express";
import logging from "../config/logging";
import { Connect, Query, PreparedQuery } from "../config/mysql";

const NAMESPACE = "GuardiaModel";

const getEsquema = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Getting esquema");

    let query = "SELECT * FROM guardiamodel";

    Connect().then((connection) => {
        Query(connection, query)
            .then((esquema) => {
                logging.info(NAMESPACE, 'Retrieved esquema: ', esquema);
                return res.status(200).json(
                    esquema
                );
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
    }).catch(error => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(500).json({
            error
        })
    })
};

const insertEsquemaRow = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Inserting esquema row");

    const categoria = req.body.categoria;
    const unitat = req.body.unitat;
    const torn = req.body.torn;
    const numeroPlaces = req.body.numeroPlaces;
    const estat = req.body.estat;
    Connect().then((connection) => {
        let values = new Array<string>;
        let query = "INSERT INTO guardiamodel (categoria,unitat,torn,numeroPlaces,estat) VALUES (?,?,?,?,?)";
        values['0'] = categoria;
        values['1'] = unitat;
        values['2'] = torn;
        values['3'] = numeroPlaces;
        values['4'] = estat;

        PreparedQuery(connection, query, values)
            .then((esquema) => {
                logging.info(NAMESPACE, 'Inserted esquema row: ', esquema);
                return res.status(200).json({
                    message: `Esquema row inserted!`
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

const updateEsquemaRow = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Updating esquema row");

    const categoria = req.body.categoria;
    const unitat = req.body.unitat;
    const torn = req.body.torn;
    const numeroPlaces = req.body.numeroPlaces;
    const estat = req.body.estat;
    const id = req.body.id;
    Connect().then((connection) => {
        let values = new Array<string>;
        let query = "UPDATE guardiamodel SET categoria = ?, unitat = ?, torn = ?, numeroPlaces = ?, estat = ? WHERE id = ?";
        values['0'] = categoria;
        values['1'] = unitat;
        values['2'] = torn;
        values['3'] = numeroPlaces;
        values['4'] = estat;
        values['5'] = id;

        PreparedQuery(connection, query, values)
            .then((esquema) => {
                logging.info(NAMESPACE, 'Updated esquema row: ', esquema);
                return res.status(200).json({
                    message: `Esquema row ${id} canviat`
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

const deleteEsquemaRow = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Deleting esquema row");

    const id = req.body.id;
    Connect().then((connection) => {
        let values = new Array<string>;
        let query = "DELETE FROM guardiamodel WHERE id = ?";
        values['0'] = id;

        PreparedQuery(connection, query, values)
            .then((esquema) => {
                logging.info(NAMESPACE, 'Deleted esquema row: ', esquema);
                return res.status(200).json({
                    message: `Esquema row ${id} eliminat`
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


export default { getEsquema, insertEsquemaRow, updateEsquemaRow, deleteEsquemaRow };