import { NextFunction, Request, Response } from "express";
import logging from "../config/logging";
import { Connect, Query, PreparedQuery } from "../config/mysql";

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
    }).catch(error => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(500).json({
            error
        })
    })

};

const insertCategoria = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Inserting categoria");
    const nom = req.body.nom;

    Connect().then((connection) => {
        let values = new Array<string>;
        let query = "INSERT INTO categoria (nom) VALUES (?)";
        values['0'] = nom;

        PreparedQuery(connection, query, values)
            .then((categoria) => {
                logging.info(NAMESPACE, 'Inserted categoria: ', categoria);
                return res.status(200).json({
                    message: `Categoria ${nom} insertada!`
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
    const nom = req.body.nom;

    Connect().then((connection) => {
        let values = new Array<string>;
        let query = "UPDATE categoria SET estat = ? WHERE nom = ?";
        values['0'] = estat;
        values['1'] = nom;

        PreparedQuery(connection, query, values)
            .then((estat) => {
                logging.info(NAMESPACE, 'Updated estat: ', estat);
                return res.status(200).json({
                    message: `Categoria ${nom} canviada d'estat`
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


export default { getAllCategories, updateEstat, insertCategoria };