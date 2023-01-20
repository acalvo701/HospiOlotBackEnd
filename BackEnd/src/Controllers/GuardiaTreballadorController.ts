import { NextFunction, Request, Response } from "express";
import logging from "../config/logging";
import { Connect, Query, PreparedQuery } from "../config/mysql";

const NAMESPACE = "GuardiesTreballadors";

const bookGuardia = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Booking guardia");

    const idTreballador = req.body.idTreballador;
    const idGuardia = req.body.idGuardia;

    Connect().then((connection) => {
        let values = new Array<string>;
        let query = "INSERT INTO guardiatreballador (idTreballador,idGuardia) VALUES (?,?)";
        values['0'] = idTreballador;
        values['1'] = idGuardia;

        PreparedQuery(connection, query, values)
            .then((guardia) => {
                logging.info(NAMESPACE, 'Guardia booked: ', guardia);
                return res.status(200).json({
                    message: `Guardia reservada!`
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

const getGuardiesFromTreballador = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Getting guardies from treballador");

    const idTreballador = req.body.idTreballador;

    Connect().then((connection) => {
        let values = new Array<string>;
        let query = `SELECT guardia.id,guardia.categoria,guardia.unitat,guardia.torn,guardia.dia,guardia.numeroPlaces,gt.estat 
                     FROM guardia 
                     INNER JOIN guardiatreballador gt 
                     ON guardia.id = gt.idGuardia 
                     WHERE gt.idTreballador = ?`;
        values['0'] = idTreballador;

        PreparedQuery(connection, query, values)
            .then((guardies) => {
                logging.info(NAMESPACE, "Getting guardies from treballador", guardies);
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

const getTreballadorsFromGuardia = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Getting treballadors from guardia");

    const idTreballador = req.body.idTreballador;

    Connect().then((connection) => {
        let values = new Array<string>;
        let query = "SELECT dni,nom,categoria,gt.estat FROM treballador LEFT JOIN guardiatreballador gt ON treballador.id = gt.idTreballador WHERE gt.idGuardia = ?";
        values['0'] = idTreballador;

        PreparedQuery(connection, query, values)
            .then((historial) => {
                logging.info(NAMESPACE, 'History treballador: ', historial);
                return res.status(200).json({
                    historial
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

const getHistoryTreballador = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Getting history treballador");

    const idTreballador = req.query.idTreballador;
    //logging.error(NAMESPACE, idTreballador,idTreballador);
    Connect().then((connection) => {
        let values = new Array<any>;
        let query = "SELECT dia,gt.estat,torn,unitat,categoria FROM guardia LEFT JOIN guardiatreballador gt ON guardia.id = gt.idGuardia WHERE gt.idTreballador = ? AND UPPER(gt.estat) IN ('PENDENT','ASSIGNADA')";
        values['0'] = idTreballador;

        PreparedQuery(connection, query, values)
            .then((historial) => {
                logging.info(NAMESPACE, 'History treballador: ', historial);
                return res.status(200).json({
                    historial
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

const countTreballadorsOfGuardia = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Counting guard's workers");

    const idGuardia = req.body.idGuardia;

    Connect().then((connection) => {
        let values = new Array<string>;
        let query = "SELECT COUNT(idTreballador) AS 'count' FROM guardiatreballador WHERE idGuardia = ?";
        values['0'] = idGuardia;

        PreparedQuery(connection, query, values)
            .then((count) => {
                logging.info(NAMESPACE, 'Guardies counted: ', count);
                return res.status(200).json(
                    count[0]
                );
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
    const idTreballador = req.body.idTreballador;
    const idGuardia = req.body.idGuardia;

    Connect().then((connection) => {
        let values = new Array<string>;
        let query = "UPDATE guardiatreballador SET estat = ? WHERE idTreballador = ? AND idGuardia = ?";
        values['0'] = estat;
        values['1'] = idTreballador;
        values['2'] = idGuardia;

        PreparedQuery(connection, query, values)
            .then((estat) => {
                logging.info(NAMESPACE, 'Updated estat: ', estat);
                return res.status(200).json({
                    message: `Guardia ${idGuardia} canviada d'estat`
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

export default { bookGuardia, getHistoryTreballador, getGuardiesFromTreballador, getTreballadorsFromGuardia, countTreballadorsOfGuardia, updateEstat };