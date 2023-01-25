import Entity from "./Entity";
import Categoria from "./Categoria";
import Guardia from "./Guardia";
class Treballador extends Entity {
    private nom: string;
    private DNI: string;
    private categoria: Categoria;
    private qGuardiesTreballades: number;
    private guardies: Array<Guardia> = new Array();
    private rol: string;
    public password: string;
    constructor(nom: string, DNI: string, categoria: Categoria, rol: string) {
        super();
        if (rol) {
            this.nom = nom;
            this.DNI = DNI;
            this.categoria = categoria;
            this.rol = rol;
        } else {
            this.nom = nom;
            this.DNI = DNI;
            this.categoria = categoria;
        }
    }

    public getRol(): string {
        return this.rol;
    }

    public setRol(rol: string): void {
        this.rol = rol;
    }

    // public getGuardies(): Array<Guardia> {
    //     return trebunitdao.getGuardies(this.getID());
    // }


    public toString(): string {
        return "Treballador{" + "nom=" + this.nom + ", DNI=" + this.DNI + ", categoria=" + this.categoria + ", qGuardiesTreballades=" + this.qGuardiesTreballades + "id=" + this.getID() + "}";
    }



    public getNom(): string {
        return this.nom;
    }

    public setNom(nom: string): void {
        this.nom = nom;
    }

    public getDNI(): string {
        return this.DNI;
    }

    public setDNI(DNI: string): void {
        this.DNI = DNI;
    }

    public getCategoria(): Categoria {
        return this.categoria;
    }

    public setCategoria(categoria: Categoria): void {
        this.categoria = categoria;
    }

    // public reservarGuardia(guardia: Guardia): void {
    //     if (!guardia.getCoberta()) {
    //         trebunitdao.reservarGuardia(this.getID(), g.getID());
    //     }
    // }

    // public anularGuardia(guardia: Guardia): void {

    //     trebunitdao.anularGuardia(this.getID(), guardia.getID());

    // }

}

export = Treballador;