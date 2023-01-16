package hospiolot.model.business.entities;

import hospiolot.model.persistence.dao.implementations.JDBCTreballadorFaGuardiaDAO;
import hospiolot.model.persistence.exception.DAOException;
import java.util.ArrayList;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

public class Guardia extends Entity {

    static JDBCTreballadorFaGuardiaDAO trebunitdao = new JDBCTreballadorFaGuardiaDAO();

    public Guardia(Categoria c, Unitat u, Torn t, Byte placesCobrir) {
        this.c = c;
        this.u = u;
        this.t = t;
        this.placesACobrir = placesCobrir;
    }

    private Categoria c;
    private Unitat u;
    private Torn t;
    private LocalDate data;
    private Byte placesACobrir;
    private Boolean coberta;
    private List<Treballador> treballadors;

    public List<Treballador> getTreballadors() throws DAOException {
      
            return trebunitdao.getTreballadors(this.getID());
        
    }

    public Boolean getCoberta() throws DAOException {
        if (this.getTreballadors()==null) {
            return true;
        } else {
            return this.getTreballadors().size() == placesACobrir;
        }

    }

    public void setCoberta(Boolean isCoberta) {
        this.coberta = isCoberta;
    }

    public Guardia() {
    }

    ;
    
    public Guardia(long id, Categoria c, Unitat u, Torn t, LocalDate data, Byte placesCobrir) {
        this.setID(id);
        this.c = c;
        this.u = u;
        this.t = t;
        this.data = data;
        this.placesACobrir = placesCobrir;
    }

    public Guardia(Categoria c, Unitat u, Torn t, LocalDate data, Byte placesCobrir) {
        this.c = c;
        this.u = u;
        this.t = t;
        this.data = data;
        this.placesACobrir = placesCobrir;
    }

    public Guardia(GuardiaModel g, LocalDate data) {
        this.c = g.getC();
        this.t = g.getT();
        this.u = g.getU();
        this.placesACobrir = g.getPlacesCobrir();
        this.data = data;

    }

    public Guardia(Unitat u, Torn t, Categoria c, Byte placesCobrir) {
        this.c = c;
        this.u = u;
        this.t = t;
        this.placesACobrir = placesCobrir;
    }

    @Override
    public String toString() {
        return "id= " + this.getID() + c + "," + u + "," + t + "," + data + "," + placesACobrir;
    }

    public String toStringv2() {
        return "id= " + this.getID() + u + "," + t + "," + data + "," + placesACobrir;
    }

    public Categoria getC() {
        return c;
    }

    public void setC(Categoria c) {
        this.c = c;
    }

    public Unitat getU() {
        return u;
    }

    public void setU(Unitat u) {
        this.u = u;
    }

    public Torn getT() {
        return t;
    }

    public void setT(Torn t) {
        this.t = t;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Byte getPlacesACobrir() {
        return placesACobrir;
    }

    public void setPlacesACobrir(Byte placesACobrir) {
        this.placesACobrir = placesACobrir;
    }
}
