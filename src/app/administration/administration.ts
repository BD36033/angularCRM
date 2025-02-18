export enum EquipementType {
    TABLE = 'Table',
    VISIO = 'Visio'
}


export class Administration {
    id: number;
    adresse: string;
    telephone: string;
    capacite: number;
    accesibilite: boolean;
    equipements: EquipementType[];

    constructor(
        id: number,
        adresse: string,
        telephone: string,
        capacite: number,
        accesibilite: boolean,
        equipements: EquipementType[]
    ) {
        this.id = id;
        this.adresse = adresse;
        this.telephone = telephone;
        this.capacite = capacite;
        this.accesibilite = accesibilite;
        this.equipements = equipements;
    }



  }
  