//Gestion du service spécifique à Administration
//c'est ici qu'on appelera l'API comme j'ai fais dans l'exemple Hero

import { Injectable } from '@angular/core';
import { Administration, EquipementType } from './administration';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {
  private salles: Administration[] = [];
  private sallesSubject = new BehaviorSubject<Administration[]>([]);

  constructor() {
    // Initialiser avec les mêmes données que dans le composant a virer quand service connecté
    this.salles = [
      new Administration(1, '12 rue fabienne Landy 37700 SPDC', '0249345965', 150, true, [EquipementType.TABLE, EquipementType.VISIO]),
      new Administration(2, '45 avenue des Champs-Élysées, 75008 Paris', '0142345678', 200, true, [EquipementType.TABLE]),
      new Administration(3, '10 rue de Rivoli, 75001 Paris', '0156789123', 100, false, [EquipementType.VISIO]),
      new Administration(4, '22 boulevard Saint-Germain, 75005 Paris', '0167891234', 80, true, [EquipementType.TABLE, EquipementType.VISIO]),
      new Administration(5, '5 place de la République, 75011 Paris', '0178901234', 120, true, [EquipementType.TABLE]),
      new Administration(6, '30 rue de la Paix, 75002 Paris', '0189012345', 250, false, [EquipementType.VISIO]),
      new Administration(7, '15 rue de la Liberté, 75012 Paris', '0190123456', 90, true, [EquipementType.TABLE, EquipementType.VISIO]),
      new Administration(8, '8 rue de la Concorde, 75008 Paris', '0201234567', 60, true, [EquipementType.TABLE])
    ];
    this.sallesSubject.next(this.salles);
  }

  getSalles(): Observable<Administration[]> {
    return this.sallesSubject.asObservable();
  }

  getSalleById(id: number): Administration | undefined {
    return this.salles.find(salle => salle.id === id);
  }

  updateSalle(salle: Administration) {
    const index = this.salles.findIndex(s => s.id === salle.id);
    if (index !== -1) {
      this.salles[index] = salle;
      this.sallesSubject.next([...this.salles]);
    }
  }

  deleteSalle(id: number) {
    this.salles = this.salles.filter(salle => salle.id !== id);
    this.sallesSubject.next([...this.salles]);
  }
}