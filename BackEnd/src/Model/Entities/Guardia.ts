import Entity from "./Entity";
import Categoria from "./Categoria";
import Unitat from "./Unitat";
import Torn from "./Torn";
import Treballador from "./Treballador";

class Guardia extends Entity {

//    static JDBCTreballadorFaGuardiaDAO trebunitdao = new JDBCTreballadorFaGuardiaDAO();

    private c:Categoria;
    private u:Unitat;
    private t:Torn;
    private data:Date;
    private placesACobrir:number;
    private coberta:boolean;
    private treballadors:Array<Treballador> ;


    public constructor () {
        super();

    }

    public getTreballadors():Array<Treballador> | Error {
      
        return trebunitdao.getTreballadors(this.getID());
    }

    public getCoberta():Boolean {
        if (this.getTreballadors()==null) {
            return true;
        } else {
            return this.getTreballadors().size() == placesACobrir;
        }

    }

    public setCoberta(isCoberta:boolean):void {
        this.coberta = isCoberta;
    }

  
    
    public Guardia(c:Categoria, u:Unitat, t:Torn, placesCobrir:number):void {
        this.c = c;
        this.u = u;
        this.t = t;
        this.placesACobrir = placesCobrir;
    }
    
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
