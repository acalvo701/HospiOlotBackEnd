package hospiolot.model.persistence.dao.implementations;

import hospiolot.model.business.entities.Torn;
import hospiolot.model.business.entities.Unitat;
import hospiolot.model.persistence.dao.implementations.connection.Connection;
import hospiolot.model.persistence.dao.contracts.UnitatDAO;
import hospiolot.model.persistence.exception.DAOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class JDBCUnitatDAO implements UnitatDAO {

    @Override
    public List<Unitat> getAll() throws DAOException {
        try {
            Statement query = Connection.getInstance().getConnection().createStatement();
            ResultSet result = query.executeQuery("SELECT * FROM hospiolot.unitats");
            List<Unitat> llista = new ArrayList<>();
            JDBCUnitatDAO uni = new JDBCUnitatDAO();
            while (result.next()) {

                llista.add(uni.get(result.getInt("id")));

            }
            return llista;
        } catch (SQLException ex) {

            throw new DAOException();

        }

    }
    
        public List<Long> getAllCaps() throws DAOException {
        try {
            Statement query = Connection.getInstance().getConnection().createStatement();
            ResultSet result = query.executeQuery("SELECT idcapdeunitat FROM hospiolot.unitats");
            List<Long> llista = new ArrayList<>();
          
            while (result.next()) {

                llista.add(result.getLong("idcapdeunitat"));

            }
            return llista;
        } catch (SQLException ex) {

            throw new DAOException();

        }

    }

    @Override
    public Unitat get(long id) throws DAOException {
        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("SELECT * from hospiolot.unitats where ID=?");
            query.setLong(1, id);
            ResultSet result = query.executeQuery();

            if (result.next()) {
                Unitat u = new Unitat(result.getString("nom"));
                u.setIdCap(result.getLong("idcapdeunitat"));
                u.setID(result.getLong("id"));
                return u;
            } else {
                return null;
            }

        } catch (SQLException ex) {
            throw new DAOException();
        }
    }

    @Override
    public void add(Unitat u) throws DAOException {

        try {
            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("INSERT INTO hospiolot.unitats(nom) VALUES(?)", Statement.RETURN_GENERATED_KEYS);

            query.setString(1, u.getNom());
            query.executeUpdate();
            ResultSet rst = query.getGeneratedKeys();
            if (rst.next()) {
                u.setID(rst.getInt(1));
            }

        } catch (SQLException ex) {
            System.out.println(ex);
        }
    }

    @Override
    public void update(Unitat u) throws DAOException {
        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("UPDATE hospiolot.UNITATS SET NOM=? WHERE ID=?");
            query.setString(1, u.getNom());
            query.setLong(2, u.getID());
            query.executeUpdate();

        } catch (SQLException ex) {

            throw new DAOException();

        }
    }

    @Override
    public void delete(Unitat u) throws DAOException {
        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("DELETE FROM hospiolot.UNITATS WHERE ID=?");
            query.setLong(1, u.getID());
            query.executeUpdate();

        } catch (SQLException ex) {
            throw new DAOException();

        }
    }

    public Unitat searchByName(String name) throws DAOException {
        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("SELECT id FROM hospiolot.unitats WHERE nom=?");
            query.setString(1, name);
            ResultSet result = query.executeQuery();
            if (result.next()) {
                return get(result.getLong("id"));
            } else {
                return null;
            }
        } catch (SQLException ex) {
            throw new DAOException();

        }

    }

}
