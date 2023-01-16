
package hospiolot.model.business.entities;


public class Rol extends Entity {

    private String nom;
    
    public Rol(String rol) {
        this.nom = rol;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    

    
}
