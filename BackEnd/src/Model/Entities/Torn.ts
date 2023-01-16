import Entity from "./Entity";

class Torn{

    private modalitat:string;

    public constructor(modalitat:string) {
        this.modalitat = modalitat;
    }

    public getModalitat():string {
        return this.modalitat;
    }

    public setModalitat(modalitat:string):void {
        this.modalitat = modalitat;
    }

    public toString() : string {
        return this.modalitat; 
    }
    
}

export = Torn;