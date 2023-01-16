package hospiolot.model.persistence.dao.implementations;

import hospiolot.model.business.entities.Categoria;
import hospiolot.model.business.entities.Guardia;
import hospiolot.model.business.entities.Treballador;
import hospiolot.model.persistence.dao.implementations.connection.Connection;
import hospiolot.model.persistence.exception.DAOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.sql.Date;
import java.util.List;

public class JDBCTreballadorFaGuardiaDAO {

    public void reservarGuardia(long idTreballador, long idGuardia) throws DAOException{
        
        try {  

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("INSERT INTO hospiolot.treballadorfaguardia (idtreballador,idguardia) VALUES(?,?)");
            query.setLong(1, idTreballador);
            query.setLong(2, idGuardia);
            
            query.executeUpdate();
           
        

        } catch (SQLException ex) {
            throw new DAOException();
        }   
    }
    
     public void anularGuardia(long idTreballador, long idGuardia) throws DAOException{
        
        try {  

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("DELETE FROM hospiolot.treballadorfaguardia WHERE idtreballador=? AND idguardia=?");
            query.setLong(1, idTreballador);
            query.setLong(2, idGuardia);
            
            query.executeUpdate();
           
        

        } catch (SQLException ex) {
            throw new DAOException();
        }   
    }
    
    
    public List<Treballador> getTreballadors(long idGuardia) throws DAOException {
        try {  

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("SELECT * from hospiolot.treballadorfaguardia where idguardia=?");
            query.setLong(1, idGuardia);
            ResultSet result = query.executeQuery();
            JDBCTreballadorDAO treb = new JDBCTreballadorDAO();
            List<Treballador>llista = new ArrayList<>();
            while (result.next()) {
                llista.add(treb.get(result.getLong("idtreballador")));
                
            } 
            return llista;

        } catch (SQLException ex) {
            throw new DAOException();
        }

    }

    public List<Guardia> getGuardies(long idTreballador) throws DAOException {
        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("SELECT * from hospiolot.treballadorfaguardia where idtreballador=?");
            query.setLong(1, idTreballador);
            
            ResultSet result = query.executeQuery();
            JDBCGuardiaDAO guard = new JDBCGuardiaDAO();
            List<Guardia>llista = new ArrayList();
             while (result.next()) {
                llista.add(guard.get(result.getLong("idguardia")));
                
            } 
            return llista;

        } catch (SQLException ex) {
            throw new DAOException();
        }
    }
    
        public int getQuantitatDeGuardiesDeLany(long idTreballador, LocalDate data) throws DAOException {
        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("select COUNT(*) from hospiolot.treballadorfaguardia tfg inner join hospiolot.guardies g on tfg.idguardia = g.id inner join hospiolot.treballadors t on tfg.idtreballador = t.id AND idtreballador=? and year(g.dia) = year(?)");
            query.setLong(1, idTreballador);
            query.setDate(2, Date.valueOf(data));
            ResultSet result = query.executeQuery();
            JDBCGuardiaDAO guard = new JDBCGuardiaDAO();
            
             if (result.next()) {
                return result.getInt("COUNT(*)");
                
            } 
            return 0;

        } catch (SQLException ex) {
           throw new DAOException();
        }
    }

}
