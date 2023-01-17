import { NextFunction, Request, Response } from "express";
import logging from "../config/logging";
import { Connect, Query } from "../config/mysql";

const NAMESPACE = "Categories";
const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Getting all categories");

    let query = "SELECT * FROM categoria";

    Connect().then((connection) => {
        Query(connection, query)
            .then((categories) => {
                logging.info(NAMESPACE, 'Retrieved categories: ', categories);
                return res.status(200).json({
                    categories
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

export default { getAllCategories };