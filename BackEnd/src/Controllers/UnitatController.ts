import { NextFunction, Request, Response } from "express";
import logging from "../config/logging";
import { Connect, Query } from "../config/mysql";

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

export default { getAllUnitats };