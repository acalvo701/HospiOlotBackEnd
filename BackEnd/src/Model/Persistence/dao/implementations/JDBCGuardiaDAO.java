package hospiolot.model.persistence.dao.implementations;

import hospiolot.model.business.entities.Categoria;
import hospiolot.model.business.entities.Guardia;
import hospiolot.model.business.entities.Torn;
import hospiolot.model.business.entities.Treballador;
import hospiolot.model.business.entities.Unitat;
import hospiolot.model.persistence.dao.contracts.GuardiaDAO;
import hospiolot.model.persistence.dao.implementations.connection.Connection;
import hospiolot.model.persistence.exception.DAOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Date;
import java.sql.Statement;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

public class JDBCGuardiaDAO implements GuardiaDAO {

    static JDBCTornDAO torndao = new JDBCTornDAO();
    static JDBCUnitatDAO unitatdao = new JDBCUnitatDAO();
    static JDBCCategoriaDAO categoriadao = new JDBCCategoriaDAO();
    static JDBCTreballadorDAO treballadordao = new JDBCTreballadorDAO();

    @Override
    public Guardia get(long id) throws DAOException {
        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("SELECT * from hospiolot.guardies where ID=?");
            query.setLong(1, id);
            ResultSet result = query.executeQuery();

            if (result.next()) {
                Categoria cat = categoriadao.get(result.getInt("idcategoria"));
                Unitat u = unitatdao.get(result.getInt("idunitat"));
                Torn t = torndao.get(result.getInt("idtorn"));
                LocalDate d = result.getDate("dia").toLocalDate();

                byte PlacesACobrir = result.getByte("placesACobrir");
                Guardia g = new Guardia(id, cat, u, t, d, PlacesACobrir);

                return g;
            } else {
                throw new DAOException();
            }

        } catch (SQLException ex) {
            throw new DAOException();
        }

    }

    @Override
    public List<Guardia> getAll() throws DAOException {
        try {
            Statement query = Connection.getInstance().getConnection().createStatement();
            ResultSet result = query.executeQuery("SELECT * FROM hospiolot.guardies");
            List<Guardia> llista = new ArrayList<>();
            JDBCGuardiaDAO guar = new JDBCGuardiaDAO();
            while (result.next()) {

                llista.add(guar.get(result.getInt("id")));

            }
            return llista;
        } catch (SQLException ex) {

            throw new DAOException();

        }
    }

    public List<Guardia> getAllFilterByDate() throws DAOException {
        try {
            Statement query = Connection.getInstance().getConnection().createStatement();
            ResultSet result = query.executeQuery("SELECT * FROM hospiolot.guardies WHERE dia >= CURRENT_DATE()");
            List<Guardia> llista = new ArrayList<>();
            JDBCGuardiaDAO guar = new JDBCGuardiaDAO();
            while (result.next()) {

                llista.add(guar.get(result.getInt("id")));

            }
            return llista;
        } catch (SQLException ex) {

            throw new DAOException();

        }
    }

    public List<Guardia> getAllFilterByDateAndCategoria(Categoria cat) throws DAOException {
        try {
            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("SELECT * FROM hospiolot.guardies WHERE dia >= CURRENT_DATE() AND idCategoria=?");
            query.setLong(1, cat.getID());
            ResultSet result = query.executeQuery();

            List<Guardia> llista = new ArrayList<>();
            JDBCGuardiaDAO guar = new JDBCGuardiaDAO();
            while (result.next()) {

                llista.add(guar.get(result.getInt("id")));

            }
            return llista;
        } catch (SQLException ex) {

            throw new DAOException();

        }
    }

    public List<Guardia> getAllAvailableGuardies(Treballador t) throws DAOException {
        try {
            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("SELECT * FROM hospiolot.guardies  WHERE  idcategoria =? AND dia between current_date() and date_add(current_date(), INTERVAL 1 year) AND (SELECT count(*) FROM hospiolot.treballadorfaguardia where idguardia = id )< (hospiolot.guardies.placesACobrir) AND id NOT in (select idguardia from hospiolot.treballadorfaguardia where idtreballador =?)");
            query.setLong(1, t.getC().getID());
            query.setLong(2, t.getID());
            ResultSet result = query.executeQuery();

            List<Guardia> llista = new ArrayList<>();
            JDBCGuardiaDAO guar = new JDBCGuardiaDAO();
            while (result.next()) {

                llista.add(guar.get(result.getInt("id")));

            }
            return llista;
        } catch (SQLException ex) {

            throw new DAOException();

        }
    }

    @Override
    public void add(Guardia t) throws DAOException {

        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("INSERT INTO hospiolot.guardies(idCategoria,idUnitat,idTorn,placesACobrir,dia) VALUES(?,?,?,?,?)", Statement.RETURN_GENERATED_KEYS);
            query.setLong(1, t.getC().getID());
            query.setLong(2, t.getU().getID());
            query.setLong(3, t.getT().getID());
            query.setByte(4, t.getPlacesACobrir());
            query.setDate(5, Date.valueOf(t.getData()));

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
    public void update(Guardia t) throws DAOException {
        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("UPDATE hospiolot.guardies SET idCategoria=?, idUnitat=?, idTorn=?, placesACobrir=?, dia=? WHERE ID=?");

            query.setLong(1, t.getC().getID());
            query.setLong(2, t.getU().getID());
            query.setLong(3, t.getT().getID());
            query.setByte(4, t.getPlacesACobrir());
            query.setDate(5, Date.valueOf(t.getData()));
            query.setLong(6, t.getID());

            query.executeUpdate();

        } catch (SQLException ex) {

            throw new DAOException();

        }
    }

    @Override//Borra la guàrdia traient tots els treballadors d'aquesta i després borrant-la
    public void delete(Guardia g) throws DAOException {
        try {
            JDBCTreballadorFaGuardiaDAO trebunitdao = new JDBCTreballadorFaGuardiaDAO();
            for (Treballador tr : trebunitdao.getTreballadors(g.getID())) {
                trebunitdao.anularGuardia(tr.getID(), g.getID());
            }

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("DELETE FROM hospiolot.guardies WHERE ID=?");
            query.setLong(1, g.getID());
            query.executeUpdate();

        } catch (SQLException ex) {
            throw new DAOException();

        }

    }

    public boolean doesExist(Guardia t) throws DAOException {

        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("SELECT * FROM hospiolot.guardies WHERE idcategoria=? AND idunitat=? AND idTorn=? AND placesACobrir=? AND dia=?");
            query.setLong(1, t.getC().getID());
            query.setLong(2, t.getU().getID());
            query.setLong(3, t.getT().getID());
            query.setLong(4, t.getPlacesACobrir());
            query.setDate(5, Date.valueOf(t.getData()));
            ResultSet result = query.executeQuery();

            if (result.next()) {
                return true;
            } else {
                return false;
            }

        } catch (SQLException ex) {
            throw new DAOException();

        }

    }

}
