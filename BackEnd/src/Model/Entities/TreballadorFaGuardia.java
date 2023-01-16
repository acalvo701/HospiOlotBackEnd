
package hospiolot.model.business.entities;


public class TreballadorFaGuardia {

    private Guardia g;
    private Treballador t;
    
    public TreballadorFaGuardia(Guardia g, Treballador t) {
        this.g = g;
        this.t = t;
    }
    
    public Guardia getG() {
        return g;
    }

    public void setG(Guardia g) {
        this.g = g;
    }

    public Treballador getT() {
        return t;
    }

    public void setT(Treballador t) {
        this.t = t;
    }
    
    
    
}
