package hospiolot.model.persistence.dao.implementations;

import hospiolot.model.business.entities.Categoria;
import hospiolot.model.business.entities.Rol;
import hospiolot.model.business.entities.Treballador;
import hospiolot.model.persistence.dao.implementations.connection.Connection;
import hospiolot.model.persistence.dao.contracts.TreballadorDAO;
import hospiolot.model.persistence.exception.DAOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class JDBCTreballadorDAO implements TreballadorDAO {

    @Override
    public Treballador get(long id) throws DAOException {

        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("SELECT * from hospiolot.treballadors where ID=?");
            query.setLong(1, id);
            ResultSet result = query.executeQuery();
            JDBCRolDAO roldao = new JDBCRolDAO();
            JDBCCategoriaDAO pa = new JDBCCategoriaDAO();
            if (result.next()) {
                Categoria cat = pa.get(result.getInt("idcategoria"));
                Rol r = roldao.get(result.getInt("idrol"));
                Treballador c = new Treballador(result.getString("nom"), result.getString("dni"), cat, r);
                c.setID(result.getLong("id"));
                return c;
            } else {
                return null;
            }

        } catch (SQLException ex) {
            throw new DAOException();
        }

    }

    public Treballador get(long id, String hashedPassword) throws DAOException {

        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("SELECT * from hospiolot.treballadors where ID=? AND password=?");
            query.setLong(1, id);
            query.setString(2, hashedPassword);
            ResultSet result = query.executeQuery();
            JDBCRolDAO roldao = new JDBCRolDAO();
            JDBCCategoriaDAO pa = new JDBCCategoriaDAO();
            if (result.next()) {
                Categoria cat = pa.get(result.getInt("idcategoria"));
                Rol r = roldao.get(result.getInt("idrol"));
                Treballador c = new Treballador(result.getString("nom"), result.getString("dni"), cat, r);
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
    public List<Treballador> getAll() throws DAOException {
        try {

            Statement query = Connection.getInstance().getConnection().createStatement();
            ResultSet result = query.executeQuery("SELECT * FROM hospiolot.treballadors");
            List<Treballador> llista = new ArrayList<>();
            JDBCTreballadorDAO trebal = new JDBCTreballadorDAO();

            while (result.next()) {

                llista.add(trebal.get(result.getInt("id")));

            }
            return llista;
        } catch (SQLException ex) {

            throw new DAOException();

        }
    }

    @Override
    public void add(Treballador t) throws DAOException {
        try {
            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("INSERT INTO hospiolot.treballadors (nom,dni,idcategoria) VALUES(?,?,?)", Statement.RETURN_GENERATED_KEYS);

            query.setString(1, t.getNom());
            query.setString(2, t.getDNI());
            query.setLong(3, t.getC().getID());
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
    public void update(Treballador t) throws DAOException {
        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("UPDATE hospiolot.Treballadors SET NOM=?,DNI=?,idcategoria=? WHERE ID=?");
            query.setString(1, t.getNom());
            query.setString(2, t.getDNI());
            query.setLong(3, t.getC().getID());
            query.setLong(4, t.getID());
            query.executeUpdate();

        } catch (SQLException ex) {

            throw new DAOException();

        }
    }

    public void updatePassword(Treballador t, String password) throws DAOException {
        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("UPDATE hospiolot.Treballadors SET password=? WHERE ID=?");
            query.setString(1, password);
            query.setLong(2, t.getID());
            
            query.executeUpdate();

        } catch (SQLException ex) {

            throw new DAOException();

        }
    }

    @Override
    public void delete(Treballador t) throws DAOException {
        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("DELETE FROM hospiolot.Treballadors WHERE ID=?");
            query.setLong(1, t.getID());
            query.executeUpdate();

        } catch (SQLException ex) {
            throw new DAOException();

        }
    }

}
