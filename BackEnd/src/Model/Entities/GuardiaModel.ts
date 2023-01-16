import Categoria from "./Categoria";
import Unitat from "./Unitat";
import Torn from "./Torn";

class GuardiaModel {

    private categoria: Categoria;
    private unitat: Unitat;
    private torn: Torn;
    private placesCobrir: number;
    private diaAModelar: number;

    public constructor(categoria: Categoria, unitat: Unitat, torn: Torn, placesCobrir: number, diaAModelar: number) {
        this.categoria = categoria;
        this.unitat = unitat;
        this.torn = torn;
        this.placesCobrir = placesCobrir;
        this.diaAModelar = diaAModelar;
    }

    public toString(): string {
        return this.unitat + "," + this.torn + "," + this.categoria + "," + this.placesCobrir;
    }

    public getDiaAModelar(): number {
        return this.diaAModelar;
    }

    public setDiaAModelar(diaAModelar: number): void {
        this.diaAModelar = diaAModelar;
    }

    public getC(): Categoria {
        return this.categoria;
    }

    public setC(categoria: Categoria): void {
        this.categoria = categoria;
    }

    public getU(): Unitat {
        return this.unitat;
    }

    public setU(unitat: Unitat): void {
        this.unitat = unitat;
    }

    public getT(): Torn {
        return this.torn;
    }

    public setT(torn: Torn): void {
        this.torn = torn;
    }

    public getPlacesCobrir(): number {
        return this.placesCobrir;
    }

    public setPlacesCobrir(placesCobrir: number): void {
        this.placesCobrir = placesCobrir;
    }
}

export = GuardiaModel;