import NumberUtils from "../Utilities/NumberUtils";

abstract class Entity {
    private ID: number;

    public Entity(): void {
        this.ID = NumberUtils.UNSAVED_VALUE;
    }

    public getID(): number {
        return this.ID;
    }

    public setID(ID: number): void {
        if (this.ID != NumberUtils.UNSAVED_VALUE) {
            throw new Error("id cannot be changed");
        }

        if (ID <= NumberUtils.ZERO) {
            throw new Error("id cannot be negative or zero");
        }
        this.ID = ID;
    }
}