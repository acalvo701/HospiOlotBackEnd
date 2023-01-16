package hospiolot.model.business.entities;

import hospiolot.model.business.entities.Entity;

public class Unitat extends Entity {

    private String nom;

   
    private long idCap;

    public Unitat(String nom) {
        this.nom = nom;
    }
    
    public Unitat(String nom, long idCap) {
        this.nom = nom;
        this.idCap = idCap;
       
    }
    
     public Unitat(Unitat u) {
        this(u.getNom(),u.getIdCap());
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }
    
     public long getIdCap() {
        return idCap;
    }

    public void setIdCap(long idCap) {
        this.idCap = idCap;
    }

    @Override
    public String toString() {
        return nom ;
    }

}
