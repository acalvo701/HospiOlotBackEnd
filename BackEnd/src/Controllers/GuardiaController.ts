import { NextFunction, Request, Response } from "express";
import logging from "../config/logging";
import { Connect, Query, PreparedQuery } from "../config/mysql";

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
            let query = "SELECT *,(SELECT COUNT(*) FROM guardiatreballador WHERE guardiatreballador.idGuardia = guardia.id AND guardiatreballador.estat != 'CANCELADA') as 'personesApuntades' FROM guardia WHERE guardia.dia = '2023-01-23'";
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
    }).catch(errorConnection => {
        logging.error(NAMESPACE, errorConnection.message, errorConnection);

        return res.status(500).json({
            message: errorConnection.message,
            errorConnection
        })
    })

};

const getMonthGuardiesByDate = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Getting guardies from month by date");
    const data = req.body.data;
   
    Connect().then((connection) => {
        let values = new Array<string>;
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

export default { getGuardia, getAllGuardies, getGuardiesByDay, getMonthGuardiesByDate, insertGuardia, updateGuardia };