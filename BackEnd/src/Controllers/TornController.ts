import { NextFunction, Request, Response } from "express";
import logging from "../config/logging";
import { Connect, Query } from "../config/mysql";

const NAMESPACE = "Torns";
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

export default { getAllTorns };