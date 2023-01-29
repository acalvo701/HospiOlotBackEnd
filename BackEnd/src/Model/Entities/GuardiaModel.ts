import Categoria from "./Categoria";
import Unitat from "./Unitat";
import Torn from "./Torn";

class GuardiaModel {

    public id:number;
    public categoria: string;
    public unitat: string;
    public torn: string;
    public numeroPlaces: number;

    public getCategoria(): string {
        return this.categoria;
    }

    public setCategoria(categoria: string): void {
        this.categoria = categoria;
    }

    public getUnitat(): string {
        return this.unitat;
    }

    public setUnitat(unitat: string): void {
        this.unitat = unitat;
    }

    public getTorn(): string {
        return this.torn;
    }

    public setTorn(torn: string): void {
        this.torn = torn;
    }

    public getNumeroPlaces(): number {
        return this.numeroPlaces;
    }

    public setNumeroPlaces(numeroPlaces: number): void {
        this.numeroPlaces = numeroPlaces;
    }
}

export = GuardiaModel;