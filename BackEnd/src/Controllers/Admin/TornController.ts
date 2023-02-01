import { NextFunction, Request, Response } from "express";
import logging from "../../config/logging";
import { Connect, PreparedQuery, Query } from "../../config/mysql";
import HistorialController from "./HistorialController";

const NAMESPACE = "Torn";

const getTorn = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Inserting torn");
    const nom = req.body.nom;

    Connect().then((connection) => {
        let values = new Array<string>;
        let query = "SELECT * FROM torn WHERE nom= ?";
        values['0'] = nom;

        PreparedQuery(connection, query, values)
            .then((torns) => {
                logging.info(NAMESPACE, 'Inserted torn: ', torns);
                return res.status(200).json({
                    message: `Torn ${nom} insertat!`
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

const getAllTorns = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Getting all torns");

    let query = "SELECT * FROM torn";

    Connect().then((connection) => {
        Query(connection, query)
            .then((torns) => {
                logging.info(NAMESPACE, 'Retrieved torns: ', torns);
                return res.status(200).json({
                    torns
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

const insertTorn = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Inserting torn");
    const nom = req.body.nom;

    Connect().then((connection) => {
        let values = new Array<string>;
        let query = "INSERT INTO torn (nom) VALUES (?)";
        values['0'] = nom;

        PreparedQuery(connection, query, values)
            .then((torns) => {
                logging.info(NAMESPACE, 'Inserted torn: ', torns);
                return res.status(200).json({
                    message: `Torn ${nom} insertat!`
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
    let accio = "UPDATE";
    //let abans = getTorn(nom);
    logging.info(NAMESPACE, "Updating estat");
    const estat = req.body.estat;
    const nom = req.body.nom;

    Connect().then((connection) => {
        let values = new Array<string>;
        let query = "UPDATE torn SET estat = ? WHERE nom = ?";
        values['0'] = estat;
        values['1'] = nom;

        PreparedQuery(connection, query, values)
            .then((estat) => {
                logging.info(NAMESPACE, 'Updated estat: ', estat);
                return res.status(200).json({
                    message: `Torn ${nom} canviat d'estat!`
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

  //  let despres =  TornController.getTorn(nom);

    //HistorialController.addHistorial(taula,abans,despres,accio);

};

export default { getTorn, getAllTorns, insertTorn, updateEstat };