import { NextFunction, Request, Response } from "express";
import logging from "../config/logging";
import { Connect, Query, PreparedQuery } from "../config/mysql";

const NAMESPACE = "GuardiesTreballadors";

const addHistorial = async (req: Request, res: Response, next: NextFunction) => {

    logging.changed(NAMESPACE, "Inserting change");

    const data = req.body.data;
    const taula = req.body.taula;
    const usuari = req.body.usuari;
    const abans = req.body.abans;
    const despres = req.body.despres;
    const accio = req.body.accio;

    Connect().then((connection) => {
        let values = new Array<string>;
        let query = "INSERT INTO historial (data,taula,usuari,abans,despres,accio) VALUES (?,?,?,?,?,?)";
        values['0'] = Date();
        values['1'] = taula;
        values['2'] = usuari;
        values['3'] = abans;
        values['4'] = despres;
        values['5'] = accio;

        PreparedQuery(connection, query, values)
            .then((historial) => {
                logging.changed(NAMESPACE, 'Add historial: ', historial);
                return res.status(200).json({
                    message: `Historial guardat`
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

export default { addHistorial }