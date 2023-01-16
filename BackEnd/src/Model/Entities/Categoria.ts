class Categoria {

    private nom: string;

    public Categoria(nom: string) {
        this.nom = nom;
    }

    public getNom(): string {
        return this.nom;
    }

    public setNom(nom: string): void {
        this.nom = nom;
    }

    public toString(): string {
        return this.nom;
    }
}

export = Categoria;