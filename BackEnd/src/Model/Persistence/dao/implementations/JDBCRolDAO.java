package hospiolot.model.persistence.dao.implementations;

import hospiolot.model.business.entities.Rol;
import hospiolot.model.business.entities.Torn;
import hospiolot.model.persistence.dao.contracts.RolDAO;
import hospiolot.model.persistence.dao.implementations.connection.Connection;
import hospiolot.model.persistence.exception.DAOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class JDBCRolDAO implements RolDAO {

    @Override
    public Rol get(long id) throws DAOException {
        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("SELECT * from hospiolot.rols where ID=?");
            query.setLong(1, id);
            ResultSet result = query.executeQuery();

            if (result.next()) {
                Rol r = new Rol(result.getString("nom"));
                r.setID(result.getLong("id"));
                return r;
            } else {
                return null;
            }

        } catch (SQLException ex) {
            throw new DAOException();
        }
    }

    @Override
    public List<Rol> getAll() throws DAOException {
        try {
            Statement query = Connection.getInstance().getConnection().createStatement();
            ResultSet result = query.executeQuery("SELECT * FROM hospiolot.rols");
            List<Rol> llista = new ArrayList<>();

            while (result.next()) {

                llista.add(get(result.getInt("id")));

            }
            return llista;
        } catch (SQLException ex) {

            throw new DAOException();

        }
    }

    @Override
    public void add(Rol r) throws DAOException {
        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("INSERT INTO hospiolot.rols(rol) VALUES(?)", Statement.RETURN_GENERATED_KEYS);

            query.setString(1, r.getNom());
            query.executeUpdate();
            ResultSet rst = query.getGeneratedKeys();
            if (rst.next()) {
                r.setID(rst.getInt(1));
            }

        } catch (SQLException ex) {
            throw new DAOException();
        }
    }

    public Rol searchByName(String name) throws DAOException {
        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("SELECT id FROM hospiolot.ROLS WHERE nom=?");
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

        @Override
        public void update
        (Rol t) throws DAOException {
            throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        }

        @Override
        public void delete
        (Rol t) throws DAOException {
            throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
        }

    }
