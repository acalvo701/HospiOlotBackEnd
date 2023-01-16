package hospiolot.model.persistence.dao.implementations;

import hospiolot.model.business.entities.Categoria;
import hospiolot.model.business.entities.Guardia;
import hospiolot.model.business.entities.GuardiaModel;
import hospiolot.model.business.entities.Torn;
import hospiolot.model.business.entities.Unitat;
import static hospiolot.model.persistence.dao.implementations.JDBCGuardiaDAO.categoriadao;
import static hospiolot.model.persistence.dao.implementations.JDBCGuardiaDAO.torndao;
import static hospiolot.model.persistence.dao.implementations.JDBCGuardiaDAO.unitatdao;
import hospiolot.model.persistence.dao.implementations.connection.Connection;
import hospiolot.model.persistence.exception.DAOException;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import hospiolot.model.persistence.dao.contracts.GuardiaModelDAO;

public class JDBCModelDAO {

    static JDBCTornDAO torndao = new JDBCTornDAO();
    static JDBCUnitatDAO unitatdao = new JDBCUnitatDAO();
    static JDBCCategoriaDAO categoriadao = new JDBCCategoriaDAO();

    public GuardiaModel get(long id) throws DAOException {
        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("SELECT * from hospiolot.model where ID=?");
            query.setLong(1, id);
            ResultSet result = query.executeQuery();

            if (result.next()) {
                Categoria cat = categoriadao.get(result.getInt("idcategoria"));
                Unitat u = unitatdao.get(result.getInt("idunitat"));
                Torn t = torndao.get(result.getInt("idtorn"));
                int dia = result.getInt("numDia");

                byte PlacesACobrir = result.getByte("placesACobrir");
                GuardiaModel g = new GuardiaModel(cat, u, t, PlacesACobrir, dia);

                return g;
            } else {
                throw new DAOException();
            }

        } catch (SQLException ex) {
            throw new DAOException();
        }

    }

    public List<Integer> getAvailableDays() throws DAOException {

        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("SELECT distinct(numdia) FROM hospiolot.model");
            List<Integer>llista = new ArrayList<>();
            ResultSet result = query.executeQuery();
            
           while(result.next()){
               llista.add(result.getInt("numDia"));
           }
           return llista;
        } catch (SQLException ex) {
            throw new DAOException();
        }

    }

    public void add(GuardiaModel guardia) throws DAOException {

        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("INSERT INTO hospiolot.model(idCategoria,idUnitat,idTorn,placesACobrir) VALUES(?,?,?,?)", Statement.RETURN_GENERATED_KEYS);

            query.setLong(1, guardia.getC().getID());
            query.setLong(2, guardia.getU().getID());
            query.setLong(3, guardia.getT().getID());
            query.setByte(4, guardia.getPlacesCobrir());

            query.executeUpdate();
            ResultSet rst = query.getGeneratedKeys();
            if (rst.next()) {
                guardia.setID(rst.getInt(1));
            }

        } catch (SQLException ex) {
            throw new DAOException();
        }

    }

    public List<GuardiaModel> getAll(int numDia) throws DAOException {
        try {
            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("SELECT * FROM hospiolot.model WHERE numDia=?");
            query.setInt(1, numDia);
            ResultSet result = query.executeQuery();
            List<GuardiaModel> llista = new ArrayList<>();
            GuardiaModel nova;
            while (result.next()) {
                nova = new GuardiaModel();
                nova.setU(unitatdao.get(result.getInt("idUnitat")));
                nova.setPlacesCobrir(result.getByte("placesACobrir"));
                nova.setT(torndao.get(result.getInt("idTorn")));
                nova.setC(categoriadao.get(result.getInt("idCategoria")));
                nova.setID(result.getInt("id"));
                nova.setDiaAModelar(result.getInt("numDia"));

                llista.add(nova);

            }
            return llista;
        } catch (SQLException ex) {

            throw new DAOException();

        }

    }

    public void update(GuardiaModel t) throws DAOException {
        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("UPDATE hospiolot.model SET idCategoria=?, idUnitat=?, idTorn=?, placesACobrir=?, dia=? WHERE ID=?");

            query.setLong(1, t.getC().getID());
            query.setLong(2, t.getU().getID());
            query.setLong(3, t.getT().getID());
            query.setByte(4, t.getPlacesCobrir());
            query.executeUpdate();

        } catch (SQLException ex) {

            throw new DAOException();

        }
    }

    public void delete(GuardiaModel t) throws DAOException {
        try {

            PreparedStatement query = Connection.getInstance().getConnection().prepareStatement("DELETE FROM hospiolot.model WHERE ID=?");
            query.setLong(1, t.getID());
            query.executeUpdate();

        } catch (SQLException ex) {
            throw new DAOException();

        }
    }

}
