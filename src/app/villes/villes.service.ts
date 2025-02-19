import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Ville, VilleAPI } from './villes';

interface PaginatedResponse {
  villes: Ville[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class VillesService {
  private apiUrl = 'https://geo.api.gouv.fr/communes'; // URL de base de l'API
  private fields = 'nom,code,codeDepartement,siren,codeEpci,codeRegion,codesPostaux,population';

  constructor(private http: HttpClient) { }

  // Récupérer toutes les villes
  getVilles(): Observable<Ville[]> {
    return this.http.get<VilleAPI[]>(this.apiUrl)
      .pipe(
        map(villes => {
          const transformedVilles = this.transformVilles(villes);
          console.log(transformedVilles); // Affiche le retour de l'API
          return transformedVilles;
        })
      );
  }

  // Récupérer une ville par son code
  getVilleByCode(code: string): Observable<Ville> {
    return this.http.get<VilleAPI>(`${this.apiUrl}/${code}`)
      .pipe(
        map(ville => this.transformVille(ville))
      );
  }

  // Rechercher des villes par nom
  searchVilles(nom: string): Observable<Ville[]> {
    return this.http.get<VilleAPI[]>(`${this.apiUrl}?nom=${nom}`)
      .pipe(
        map(villes => this.transformVilles(villes))
      );
  }

  // Transformer les données de l'API en format Ville
  private transformVille(villeAPI: VilleAPI): Ville {
    return {
      ...villeAPI,
      id: parseInt(villeAPI.code) // Utilise le code comme ID
    };
  }

  // Transformer un tableau de villes
  private transformVilles(villesAPI: VilleAPI[]): Ville[] {
    return villesAPI.map(ville => this.transformVille(ville));
  }

  // Filtrer les villes par département
  getVillesByDepartement(codeDepartement: string): Observable<Ville[]> {
    return this.http.get<VilleAPI[]>(`${this.apiUrl}?codeDepartement=${codeDepartement}`)
      .pipe(
        map(villes => this.transformVilles(villes))
      );
  }

  // Filtrer les villes par code postal
  getVillesByCodePostal(codePostal: string): Observable<Ville[]> {
    return this.http.get<VilleAPI[]>(`${this.apiUrl}?codePostal=${codePostal}`)
      .pipe(
        map(villes => this.transformVilles(villes))
      );
  }

  getVillesPaginated(page: number, limit: number): Observable<PaginatedResponse> {
    const params = new HttpParams()
      .set('fields', this.fields)
      .set('limit', limit.toString())
      .set('offset', (page * limit).toString());

    return this.http.get<VilleAPI[]>(this.apiUrl, { params, observe: 'response' })
      .pipe(
        map(response => {
          const total = parseInt(response.headers.get('Content-Range')?.split('/')[1] || '0');
          const villes = this.transformVilles(response.body || []);
          return { villes, total };
        })
      );
  }
}
