import { NextFunction, Request, Response } from "express";
import logging from "../../config/logging";
import { Connect, Query, PreparedQuery } from "../../config/mysql";

const NAMESPACE = "Guardies";

const getGuardia = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Getting guardia");
    const idGuardia = req.body.idGuardia;

    Connect().then((connection) => {
        let values = new Array<string>;
        let query = "SELECT * FROM guardia WHERE id = ?";
        values['0'] = idGuardia;

        PreparedQuery(connection, query, values)
            .then((guardia) => {
                logging.info(NAMESPACE, 'Retrieved guardia: ', guardia);
                return res.status(200).json(
                    guardia[0]
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

const getGuardiesByDay = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "Getting guardies from specified day");
    const data = req.query.data;

    Connect().then((connection) => {
        let values = new Array<any>;
        let query = "SELECT *,(SELECT COUNT(*) FROM guardiatreballador WHERE guardiatreballador.idGuardia = guardia.id AND guardiatreballador.estat != 'CANCELADA') as 'personesApuntades' FROM guardia WHERE guardia.dia = ?";
        values['0'] = data;

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

const getAllGuardies = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Getting all guardies");

    let query = "SELECT * FROM guardia";

    Connect().then((connection) => {
        Query(connection, query)
            .then((guardies) => {
                logging.info(NAMESPACE, 'Retrieved guardies: ', guardies);
                return res.status(200).json({
                    guardies
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
    }).catch(error => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(500).json({
            error
        })
    })

};

const getMonthGuardiesByDate = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Getting guardies from month by date");
    const data = req.query.data;

    Connect().then((connection) => {
        let values = new Array<any>;
        let query = "SELECT * FROM guardia where YEAR(?) = YEAR(guardia.dia)  AND MONTH(?) = MONTH(guardia.dia)";
        values['0'] = data;
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

const getAllGuardiesFromTreballador = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Getting guardies from treballador");
    const idTreballador = req['user'].id;
    Connect().then((connection) => {
        let values = new Array<any>;
        let query = "SELECT guardiatreballador.estat,guardia.dia FROM guardiatreballador INNER JOIN guardia ON guardiatreballador.idGuardia = guardia.id WHERE guardia.id IN (SELECT idGuardia from guardiatreballador WHERE idTreballador=?)";
        values['0'] = idTreballador;
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


const getMonthGuardiesByDateFromTreballador = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Getting guardies from month by date");
    const data = req.query.data;
    const idTreballador = req['user'].id;
    Connect().then((connection) => {
        let values = new Array<any>;
        let query = "SELECT guardiatreballador.estat,guardia.dia FROM guardiatreballador INNER JOIN guardia ON guardiatreballador.idGuardia = guardia.id where YEAR(?) = YEAR(guardia.dia)  AND MONTH(?) = MONTH(guardia.dia) AND guardia.id IN (SELECT idGuardia from guardiatreballador WHERE idTreballador=?)";
        values['0'] = data;
        values['1'] = data;
        values['2'] = idTreballador;
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


export default { getGuardia, getAllGuardies, getAllGuardiesFromTreballador, getGuardiesByDay, getMonthGuardiesByDate, getMonthGuardiesByDateFromTreballador};