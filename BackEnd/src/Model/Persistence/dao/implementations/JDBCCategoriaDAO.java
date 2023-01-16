package hospiolot.model.persistence.dao.implementations;

import hospiolot.model.business.entities.Categoria;
import hospiolot.model.persistence.dao.implementations.JDBCTornDAO;
import hospiolot.model.persistence.dao.implementations.connection.Connection;
import hospiolot.model.persistence.dao.contracts.CategoriaDAO;
import hospiolot.model.persistence.exception.DAOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class JDBCCategoriaDAO implements CategoriaDAO {



    @Override
    public Categoria get(long id) throws DAOException {
        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("SELECT * from hospiolot.categories where ID=?");
            query.setLong(1, id);
            ResultSet result = query.executeQuery();

            if (result.next()) {
                Categoria c = new Categoria(result.getString("nom"));
                c.setID(result.getLong("id"));
                return c;
            } else {
                return null;
            }

        } catch (SQLException ex) {
            throw new DAOException();
        }
    }

    @Override
    public List<Categoria> getAll() throws DAOException {
        try {
            Statement query = Connection.getInstance().getConnection().createStatement();
            ResultSet result = query.executeQuery("SELECT * FROM hospiolot.categories");
            List<Categoria> llista = new ArrayList<>();
            JDBCCategoriaDAO cat = new JDBCCategoriaDAO();
            while (result.next()) {

                llista.add(cat.get(result.getInt("id")));

            }
            return llista;
        } catch (SQLException ex) {

            throw new DAOException();

        }
    }

    @Override
    public void add(Categoria c) throws DAOException {
        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("INSERT INTO hospiolot.categories(nom) VALUES(?)", Statement.RETURN_GENERATED_KEYS);

            query.setString(1, c.getNom());
            query.executeUpdate();
            ResultSet rst = query.getGeneratedKeys();
            if (rst.next()) {
                c.setID(rst.getInt(1));
            }

        } catch (SQLException ex) {
            throw new DAOException();
        }
    }

    @Override
    public void update(Categoria c) throws DAOException {
        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("UPDATE hospiolot.CATEGORIES SET NOM=? WHERE ID=?");
            query.setString(1, c.getNom());
            query.setLong(2, c.getID());
            query.executeUpdate();

        } catch (SQLException ex) {

            throw new DAOException();

        }
    }

    @Override
    public void delete(Categoria c) throws DAOException {
        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("DELETE FROM hospiolot.CATEGORIES WHERE ID=?");
            query.setLong(1, c.getID());
            query.executeUpdate();

        } catch (SQLException ex) {
            throw new DAOException();

        }
    }

    public Categoria searchByName(String name) throws DAOException {
        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("SELECT id FROM hospiolot.CATEGORIES WHERE nom=?");
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
