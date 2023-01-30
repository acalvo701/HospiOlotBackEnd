import Entity from "./Entity";
import Categoria from "./Categoria";
import Unitat from "./Unitat";
import Torn from "./Torn";
import Treballador from "./Treballador";
import GuardiaModel from "./GuardiaModel";

class Guardia extends Entity {

    //    static JDBCTreballadorFaGuardiaDAO trebunitdao = new JDBCTreballadorFaGuardiaDAO();

    private categoria: Categoria;
    private unitat: Unitat;
    private torn: Torn;
    private data: Date;
    private placesACobrir: number;
    


    public constructor(id?: number, categoria?: Categoria, unitat?: Unitat, torn?: Torn, data?: Date, placesCobrir?: number, guardiaModel?: GuardiaModel) {
        super();

        if (guardiaModel && data) {
            this.categoria = guardiaModel.getC();
            this.torn = guardiaModel.getT();
            this.unitat = guardiaModel.getU();
            this.placesACobrir = guardiaModel.getPlacesCobrir();
            this.data = data;
        } 
        else if (categoria && unitat && torn && placesCobrir) {
            this.categoria = categoria;
            this.unitat = unitat;
            this.torn = torn;
            this.placesACobrir = placesCobrir;

        } else if (categoria && unitat && torn && data && placesCobrir) {
            this.categoria = categoria;
            this.unitat = unitat;
            this.torn = torn;
            this.data = data;
            this.placesACobrir = placesCobrir;

        } else if (id && categoria && unitat && torn && data && placesCobrir) {
            this.setID(id);
            this.categoria = categoria;
            this.unitat = unitat;
            this.torn = torn;
            this.data = data;
            this.placesACobrir = placesCobrir;
        }
    }

    public getTreballadors(): Array<Treballador> {

        return trebunitdao.getTreballadors(this.getID());
    }

    public getCoberta(): Boolean {
        if (this.getTreballadors() == null) {
            return true;
        } else {
            return this.getTreballadors().length == this.placesACobrir;
        }

    }

    public setCoberta(isCoberta: boolean): void {
        this.coberta = isCoberta;
    }

    public toString(): string {
        return "id= " + this.getID() + this.categoria + "," + this.unitat + "," + this.torn + "," + this.data + "," + this.placesACobrir;
    }

    public toStringv2(): string {
        return "id= " + this.getID() + this.unitat + "," + this.torn + "," + this.data + "," + this.placesACobrir;
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

    public getData(): Date {
        return this.data;
    }

    public setData(data: Date): void {
        this.data = data;
    }

    public getPlacesACobrir(): number {
        return this.placesACobrir;
    }

    public setPlacesACobrir(placesACobrir: number): void {
        this.placesACobrir = placesACobrir;
    }
}

export = Guardia;