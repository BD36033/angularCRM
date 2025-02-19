// animateurs.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animateur } from './animateurs';

@Injectable({
  providedIn: 'root'
})
export class AnimateursService {
  private apiUrl = 'http://localhost:3000/animateurs'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  // Récupérer tous les animateurs
  getAnimateurs(): Observable<Animateur[]> {
    return this.http.get<Animateur[]>(this.apiUrl);
  }

  // Récupérer un animateur par ID
  getAnimateurById(id: number): Observable<Animateur> {
    return this.http.get<Animateur>(`${this.apiUrl}/${id}`);
  }

  // Ajouter un nouvel animateur
  addAnimateur(animateur: Animateur): Observable<Animateur> {
    return this.http.post<Animateur>(this.apiUrl, animateur);
  }

  // Mettre à jour un animateur
  updateAnimateur(animateur: Animateur): Observable<Animateur> {
    return this.http.put<Animateur>(`${this.apiUrl}/${animateur.id}`, animateur);
  }

  // Supprimer un animateur
  deleteAnimateur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}