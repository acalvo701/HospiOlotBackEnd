import { NextFunction, Request, Response } from "express";
import logging from "../config/logging";
import { Connect, Query, PreparedQuery, BulkPreparedQuery } from "../config/mysql";
import GuardiaModel from "../Model/Entities/GuardiaModel";

const NAMESPACE = "GuardiaModel";

const getEsquema = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Getting esquema");

    let query = "SELECT * FROM guardiamodel";

    Connect().then((connection) => {
        Query(connection, query)
            .then((esquema) => {
                logging.info(NAMESPACE, 'Retrieved esquema: ', esquema);
                return res.status(200).json(
                    esquema
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

const getNomsEsquemaByIdTreballador = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Getting esquema names");

    const idTreballador = req.query.idTreballador;
    Connect().then((connection) => {
        let values = new Array<any>;
        let query = "SELECT DISTINCT nomEsquema FROM guardiamodel WHERE idTreballador = ?";
        values['0'] = idTreballador;

        PreparedQuery(connection, query, values)
            .then((esquema) => {
                logging.info(NAMESPACE, 'Getting esquema names: ', esquema);
                return res.status(200).json({
                    esquema
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

const getEsquemaByIdTreballadorAndName = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Getting esquema");

    const idTreballador = req.query.idTreballador;
    const nomEsquema = req.query.nomEsquema;
    Connect().then((connection) => {
        let values = new Array<any>;
        let query = "SELECT id,categoria,unitat,torn,numeroPlaces,estat FROM guardiamodel WHERE idTreballador = ? AND nomEsquema = ?";
        values['0'] = idTreballador;
        values['1'] = nomEsquema;

        PreparedQuery(connection, query, values)
            .then((esquema) => {
                logging.info(NAMESPACE, 'Getting esquema: ', esquema);
                return res.status(200).json({
                    esquema
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

const insertEsquemaRow = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Inserting esquema row");

    const categoria = req.body.categoria;
    const unitat = req.body.unitat;
    const torn = req.body.torn;
    const numeroPlaces = req.body.numeroPlaces;
    const estat = req.body.estat;
    Connect().then((connection) => {
        let values = new Array<string>;
        let query = "INSERT INTO guardiamodel (categoria,unitat,torn,numeroPlaces,estat) VALUES (?,?,?,?,?)";
        values['0'] = categoria;
        values['1'] = unitat;
        values['2'] = torn;
        values['3'] = numeroPlaces;
        values['4'] = estat;

        PreparedQuery(connection, query, values)
            .then((esquema) => {
                logging.info(NAMESPACE, 'Inserted esquema row: ', esquema);
                return res.status(200).json({
                    message: `Esquema row inserted!`
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

const updateEsquemaRow = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Updating esquema row");

    const categoria = req.body.categoria;
    const unitat = req.body.unitat;
    const torn = req.body.torn;
    const numeroPlaces = req.body.numeroPlaces;
    const estat = req.body.estat;
    const id = req.body.id;
    Connect().then((connection) => {
        let values = new Array<string>;
        let query = "UPDATE guardiamodel SET categoria = ?, unitat = ?, torn = ?, numeroPlaces = ?, estat = ? WHERE id = ?";
        values['0'] = categoria;
        values['1'] = unitat;
        values['2'] = torn;
        values['3'] = numeroPlaces;
        values['4'] = estat;
        values['5'] = id;

        PreparedQuery(connection, query, values)
            .then((esquema) => {
                logging.info(NAMESPACE, 'Updated esquema row: ', esquema);
                return res.status(200).json({
                    message: `Esquema row ${id} canviat`
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

const deleteEsquemaRow = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, "Deleting esquema row");

    const id = req.body.id;
    Connect().then((connection) => {
        let values = new Array<string>;
        let query = "DELETE FROM guardiamodel WHERE id = ?";
        values['0'] = id;

        PreparedQuery(connection, query, values)
            .then((esquema) => {
                logging.info(NAMESPACE, 'Deleted esquema row: ', esquema);
                return res.status(200).json({
                    message: `Esquema row ${id} eliminat`
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

const generarGuardiesEsquema = async (req: Request, res: Response, next: NextFunction) => {
  
    let query = "SELECT * FROM guardiamodel";
    let esquemaReturn;
    Connect().then((connection) => {
        Query(connection, query)
            .then((esquema:Array<GuardiaModel>) => {
                // logging.info(NAMESPACE, 'Retrieved esquema: ', esquema);
                const diaInici = req.body.diaInici;
                const diaFi = req.body.diaFi;
            
                const diumenges = getDiumenges(diaInici,diaFi);
               
                var sql = "INSERT INTO guardia (categoria,unitat,torn,dia,numeroPlaces) VALUES ?";
                
                let guardia = [];
                var values = [];

                diumenges.forEach(diumenge => {
                    
                    esquema.forEach(guardiaModel => {

                        guardia.push(guardiaModel.categoria);
                        guardia.push(guardiaModel.unitat);
                        guardia.push(guardiaModel.torn);
                        guardia.push(diumenge)
                        guardia.push(guardiaModel.numeroPlaces);
                        values.push(guardia);
                        guardia = [];
                    });
                   
                   
            
            
                });
                
                BulkPreparedQuery(connection, sql,values)
                .then((response:any) =>{
                    return res.status(200).json({
                        message: `Guardies generades`
                    });
                }).catch(error =>{
                    logging.error(NAMESPACE, error.message, error);
                    return res.status(500).json({
                        error
                    })
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
        
    });

   
};


export default { getEsquema, getNomsEsquemaByIdTreballador, getEsquemaByIdTreballadorAndName, insertEsquemaRow, updateEsquemaRow, deleteEsquemaRow, generarGuardiesEsquema };


function getDiumenges(diaInici: string, diaFi: string) {
    let entrar: boolean = true;
    let dataEntrada: Date = new Date(diaInici);
    let dataFi: Date = new Date(diaFi)
    let dates = new Array<string>();
    let counter = 0;
    while(dataEntrada <= dataFi){

        if(dataEntrada.getDay() == 0 && counter === 0){
            dates.push(dateToString(dataEntrada));
        }else{
            dataEntrada.setDate(dataEntrada.getDate() + (0 - 1 - dataEntrada.getDay() + 7) % 7 + 1);
            if(dataEntrada <= dataFi){
                dates.push(dateToString(dataEntrada));
            }
          
        }
        counter++;  
    }

    return dates;
}

function dateToString (dateString:Date) :string {
    
   let data = dateString.toLocaleString().split('/').join('-').split(',')[0].split('-');
    let reformatData = data[2] + "-"+data[1] + "-"+data[0];
    return reformatData;
}