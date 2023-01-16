package hospiolot.model.business.entities;

import hospiolot.model.business.entities.Entity;

public class Categoria extends Entity {

    private String nom;

    public Categoria(String nom) {
        this.nom = nom;
    }
    

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    @Override
    public String toString() {
        return nom ;
    }

}
