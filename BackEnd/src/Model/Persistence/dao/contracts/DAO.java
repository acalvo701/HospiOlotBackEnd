
package hospiolot.model.persistence.dao.contracts;

import hospiolot.model.persistence.exception.DAOException;
import java.util.List;


public interface DAO <T>{
  //Metodes de consulta
    T get(long id) throws DAOException;
    List<T>getAll() throws DAOException;
    
  //Metodes modificadors 
    void add(T t) throws DAOException;
    void update(T t) throws DAOException;
    void delete(T t) throws DAOException;
    
    
}
