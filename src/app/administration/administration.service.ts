//Gestion du service spécifique à Administration
//c'est ici qu'on appelera l'API comme j'ai fais dans l'exemple Hero

import { Injectable } from '@angular/core';
import { Administration, EquipementType } from './administration';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface RoomResponse {
  id: number;
  address: string;
  telephone: string;
  capacity: number;
  accessibility: boolean;
  equipments: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {
  private apiUrl = 'http://localhost:3000/rooms';
  private salles: Administration[] = [];
  private sallesSubject = new BehaviorSubject<Administration[]>([]);

  constructor(private http: HttpClient) {
    this.loadSalles();
  }
  //méthode GET on récupère les données de la réponse et on les "mappe" pour les convertir en données d'administration
  private loadSalles() {
    this.http.get<RoomResponse[]>(this.apiUrl).pipe(
      tap(data => {
        this.salles = data.map(item => this.mapToAdministration(item));
        this.sallesSubject.next([...this.salles]);
      })
    ).subscribe();
  }


  // map pour convertir les données de la réponse en données d'administration
  private mapToAdministration(response: RoomResponse): Administration {
    return new Administration(
      response.id,
      response.address,
      response.telephone,
      response.capacity,
      response.accessibility,
      this.mapEquipements(response.equipments)
    );
  }

  // map pour convertir les équipements en type EquipementType
  private mapEquipements(equipments: string[]): EquipementType[] {
    return equipments.map(eq => eq as EquipementType);
  }

  //different de loadSalles car on ne récupère pas les données de l'API on renvoie simplement l’Observable de sallesSubject, ecoute les changements sans rappeler l'API
  getSalles(): Observable<Administration[]> {
    return this.sallesSubject.asObservable();
  }

  getSalleById(id: number): Administration | undefined {
    return this.salles.find(salle => salle.id === id);
  }

  updateSalle(salle: Administration): Observable<Administration> {
    const roomData = {
      id: salle.id,
      address: salle.adresse,
      telephone: salle.telephone,
      capacity: salle.capacite,
      accessibility: salle.accesibilite,
      equipments: salle.equipements
    };

    return this.http.put<RoomResponse>(`${this.apiUrl}/${salle.id}`, roomData).pipe(
      map(response => this.mapToAdministration(response)),
      tap(updatedSalle => {
        const index = this.salles.findIndex(s => s.id === updatedSalle.id);
        if (index !== -1) {
          this.salles[index] = updatedSalle;
          this.sallesSubject.next([...this.salles]);
        }
      })
    );
  }

  deleteSalle(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.salles = this.salles.filter(salle => salle.id !== id);
        this.sallesSubject.next([...this.salles]);
      })
    );
  }

  createSalle(salle: Omit<Administration, 'id'>): Observable<Administration> {
    const roomData = {
      address: salle.adresse,
      telephone: salle.telephone,
      capacity: salle.capacite,
      accessibility: salle.accesibilite,
      equipments: salle.equipements
    };

    return this.http.post<RoomResponse>(this.apiUrl, roomData).pipe(
      map(response => this.mapToAdministration(response)),
      tap(newSalle => {
        this.salles.push(newSalle);
        this.sallesSubject.next([...this.salles]);
      })
    );
  }
}