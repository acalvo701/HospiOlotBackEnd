import { NextFunction, Request, Response } from "express";
import logging from "../config/logging";
import { Connect, Query, PreparedQuery } from "../config/mysql";

const NAMESPACE = "GuardiesTreballadors";

const bookGuardia = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Booking guardia");

    const idTreballador = req.query.idTreballador;
    const idGuardia = req.query.idGuardia;

    Connect().then((connection) => {
        let values = new Array<any>;
        let query = "INSERT INTO guardiatreballador (idTreballador,idGuardia) VALUES (?,?) ON DUPLICATE KEY UPDATE estat='PENDENT'";
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

const insertarGuardiaTreballadorAdmin = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Insert guardia al treballador");

    const idTreballador = req.body.idTreballador;
    const idGuardia = req.body.idGuardia;
    const estat = req.body.estat;

    Connect().then((connection) => {
        let values = new Array<string>;
        let query = "INSERT INTO guardiatreballador (idTreballador,idGuardia,estat) VALUES (?,?,?) ON DUPLICATE KEY UPDATE estat = ?";
        values['0'] = idTreballador;
        values['1'] = idGuardia;
        values['2'] = estat;
        values['3'] = estat;


        PreparedQuery(connection, query, values)
            .then((guardia) => {
                logging.info(NAMESPACE, 'Guardia assginada o canviada d\'estat: ', guardia);
                return res.status(200).json({
                    message: `Guardia canviada!`
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

const getGuardiesByDayFromTreballador = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Getting guardies from treballador on given day");
    const dia = req.query.dia;
    const idTreballador = req.query.idTreballador;

    Connect().then((connection) => {
        let values = new Array<any>;
        let query = `SELECT *,(SELECT COUNT(*) FROM guardiatreballador 
        WHERE guardiatreballador.idGuardia = guardia.id 
        AND guardiatreballador.estat != 'CANCELADA') as 'personesApuntades'
        
        
        
        
        FROM guardia
        INNER JOIN guardiatreballador
        ON guardia.id = guardiatreballador.idGuardia
        WHERE guardiatreballador.idTreballador = ?
        AND guardia.dia = ?
        AND UPPER(guardiatreballador.estat) != 'CANCELADA'`;
        values['0'] = idTreballador;
        values['1'] = dia;

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

const cancelGuardia = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Canceling guardia");
    const idTreballador = req.query.idTreballador;
    const idGuardia = req.query.idGuardia;

    Connect().then((connection) => {
        let values = new Array<any>;
        let query = "UPDATE guardiatreballador SET estat = 'CANCELADA' WHERE idTreballador = ? AND idGuardia = ?";
        values['0'] = idTreballador;
        values['1'] = idGuardia;

        PreparedQuery(connection, query, values)
            .then((response) => {
                logging.info(NAMESPACE, 'Canceled guardia: ', response);
                return res.status(200).json({
                    message: `Guardia ${idGuardia} cancelada`
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

export default { cancelGuardia, bookGuardia, getGuardiesByDayFromTreballador, getHistoryTreballador, getGuardiesFromTreballador, getTreballadorsFromGuardia, countTreballadorsOfGuardia, updateEstat, insertarGuardiaTreballadorAdmin };