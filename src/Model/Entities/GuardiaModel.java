package hospiolot.model.business.entities;

public class GuardiaModel extends Entity {

    private Categoria c;
    private Unitat u;
    private Torn t;
    private Byte placesCobrir;
    private int diaAModelar;

    public GuardiaModel(Categoria c, Unitat u, Torn t, Byte placesCobrir, int diaAModelar) {
        this.c = c;
        this.u = u;
        this.t = t;
        this.placesCobrir = placesCobrir;
        this.diaAModelar = diaAModelar;
    }

    public GuardiaModel() {
    }

    @Override
    public String toString() {
        return u + "," + t + "," + c + "," + placesCobrir;
    }

    public int getDiaAModelar() {
        return diaAModelar;
    }

    public void setDiaAModelar(int diaAModelar) {
        this.diaAModelar = diaAModelar;
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

    public Byte getPlacesCobrir() {
        return placesCobrir;
    }

    public void setPlacesCobrir(Byte placesCobrir) {
        this.placesCobrir = placesCobrir;
    }

    
    
    
}
