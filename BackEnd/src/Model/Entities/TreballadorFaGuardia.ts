import Guardia from "./Guardia";
import Treballador from "./Treballador";

class TreballadorFaGuardia {

    private guardia: Guardia;
    private treballador: Treballador;

    public constructor(guardia: Guardia, treballador: Treballador) {
        this.guardia = guardia;
        this.treballador = treballador;
    }

    public getG(): Guardia {
        return this.guardia;
    }

    public setG(guardia: Guardia): void {
        this.guardia = guardia;
    }

    public getT(): Treballador {
        return this.treballador;
    }

    public setT(treballador: Treballador): void {
        this.treballador = treballador;
    }
}

export = TreballadorFaGuardia;