class Unitat {

    private nom:string;

   
    private idCap:number;

    constructor(nom?: string, idCap?: number, unitat?: Unitat) {
        if (unitat) {
            this.nom = unitat.nom;
            this.idCap = unitat.idCap;
        }else if (nom && idCap) { 
            this.nom = nom;
            this.idCap = idCap;
        }else if(nom){
            this.nom = nom;
        }
    }

    public getNom():string {
        return this.nom;
    }

    public setNom(nom:string):void {
        this.nom = nom;
    }
    
     public getIdCap():number {
        return this.idCap;
    }

    public setIdCap(idCap:number):void {
        this.idCap = idCap;
    }

    public toString():string {
        return this.nom ;
    }

}

export = Unitat;