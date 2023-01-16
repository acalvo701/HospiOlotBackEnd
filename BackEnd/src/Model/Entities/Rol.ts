class Rol {

    private nom: string;

    public constructor(rol: string) {
        this.nom = rol;
    }

    public getNom(): string {
        return this.nom;
    }

    public setNom(nom: string): void {
        this.nom = nom;
    }
}

export = Rol;