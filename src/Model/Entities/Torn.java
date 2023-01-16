package hospiolot.model.business.entities;

import hospiolot.model.business.entities.Entity;


public class Torn extends Entity {

    private String modalitat;

    public Torn(String modalitat) {
        this.modalitat = modalitat;
    }

    public String getModalitat() {
        return modalitat;
    }

    public void setModalitat(String modalitat) {
        this.modalitat = modalitat;
    }

    @Override
    public String toString() {
        return  modalitat ;
    }

}
