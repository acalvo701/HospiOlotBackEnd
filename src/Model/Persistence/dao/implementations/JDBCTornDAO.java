package hospiolot.model.persistence.dao.implementations;

import hospiolot.model.business.entities.Categoria;
import hospiolot.model.business.entities.Torn;
import hospiolot.model.persistence.dao.implementations.connection.Connection;
import hospiolot.model.persistence.dao.contracts.TornDAO;
import hospiolot.model.persistence.exception.DAOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JDBCTornDAO implements TornDAO {

    @Override
    public List<Torn> getAll() throws DAOException {
        try {
            Statement query = Connection.getInstance().getConnection().createStatement();
            ResultSet result = query.executeQuery("SELECT * FROM hospiolot.torns");
            List<Torn> llista = new ArrayList<>();
            JDBCTornDAO tor = new JDBCTornDAO();
            while (result.next()) {

                llista.add(tor.get(result.getInt("id")));

            }
            return llista;
        } catch (SQLException ex) {

            throw new DAOException();

        }

    }

    @Override
    public Torn get(long id) throws DAOException {
        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("SELECT * from hospiolot.torns where ID=?");
            query.setLong(1, id);
            ResultSet result = query.executeQuery();

            if (result.next()) {
                Torn t = new Torn(result.getString("modalitat"));
                t.setID(result.getLong("id"));
                return t;
            } else {
                return null;
            }

        } catch (SQLException ex) {
            throw new DAOException();
        }
    }

    @Override
    public void add(Torn t) throws DAOException {

        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("INSERT INTO hospiolot.torns(modalitat) VALUES(?)", Statement.RETURN_GENERATED_KEYS);

            query.setString(1, t.getModalitat());
            query.executeUpdate();
            ResultSet rst = query.getGeneratedKeys();
            if (rst.next()) {
                t.setID(rst.getInt(1));
            }

        } catch (SQLException ex) {
            throw new DAOException();
        }
    }

    @Override
    public void update(Torn t) throws DAOException {
        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("UPDATE hospiolot.TORNS SET MODALITAT=? WHERE ID=?");
            query.setString(1, t.getModalitat());
            query.setLong(2, t.getID());
            query.executeUpdate();

        } catch (SQLException ex) {

            throw new DAOException();

        }
    }

    @Override
    public void delete(Torn t) throws DAOException {
        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("DELETE FROM hospiolot.TORNS WHERE ID=?");
            query.setLong(1, t.getID());
            query.executeUpdate();

        } catch (SQLException ex) {
            throw new DAOException();

        }
    }
    
        public Torn searchByName(String name) throws DAOException {
        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("SELECT id FROM hospiolot.torns WHERE modalitat=?");
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
