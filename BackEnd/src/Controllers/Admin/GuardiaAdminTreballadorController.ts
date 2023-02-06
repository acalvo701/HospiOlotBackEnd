import { NextFunction, Request, Response } from "express";
import logging from "../../config/logging";
import { Connect, Query, PreparedQuery } from "../../config/mysql";

const NAMESPACE = "GuardiesTreballadors";

const getNomsTreballadorsNotInGuardia = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Getting noms");
    const idGuardia = req.query.idGuardia;

    Connect().then((connection) => {
        let values = new Array<any>;
        let query = "SELECT treballador.nom, treballador.id FROM treballador WHERE treballador.id NOT IN (SELECT guardiatreballador.idTreballador from guardia INNER JOIN guardiatreballador ON guardia.id = guardiatreballador.idguardia WHERE guardia.id=?)";
        values['0'] = idGuardia;

        PreparedQuery(connection, query, values)
            .then((noms) => {
                logging.info(NAMESPACE, 'Getting noms: ', noms);
                return res.status(200).json({
                    noms
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
                    message: `Guardia ${idGuardia} canviada d'estat al treballador ${idTreballador}`
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

export default { updateEstat, getNomsTreballadorsNotInGuardia, insertarGuardiaTreballadorAdmin };