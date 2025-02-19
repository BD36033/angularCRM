import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Animateur } from './animateurs';



interface PaginatedResponse {
  animateurs: Animateur[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class AnimateursService {
  private apiUrl = 'http://localhost:3000/animators'; // Remplacez par l'URL de votre API
  private fields = 'name,city,address,mail,telephone';
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

  getAnimateursPaginated(page: number, limit: number): Observable<PaginatedResponse> {
    const params = new HttpParams()
      .set('fields', this.fields)
      .set('limit', limit.toString())
      .set('offset', (page * limit).toString());
  
    return this.http.get<Animateur[]>(this.apiUrl, { params, observe: 'response' })
      .pipe(
        map(response => {
          const total = parseInt(response.headers.get('Content-Range')?.split('/')[1] || '0');
          const animateurs = this.transformAnimateurs(response.body || []);
          return { animateurs, total };
        })
      );
  }
  
  private transformAnimateurs(animateurs: Animateur[]): Animateur[] {
    // Transform the animateurs if needed
    return animateurs;
  }

  searchAnimateurs(name: string, city: string): Observable<Animateur[]> {
    let params = new HttpParams();
    if (name) {
      params = params.set('name', name);
    }
    if (city) {
      params = params.set('city', city);
    }

    return this.http.get<Animateur[]>(this.apiUrl, { params })
      .pipe(
        map(animateurs => this.transformAnimateurs(animateurs))
      );
  }
}