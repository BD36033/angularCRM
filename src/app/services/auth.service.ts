import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  
  // Ajout d'un BehaviorSubject pour le nom d'utilisateur
  private currentUserSubject = new BehaviorSubject<string>('');
  currentUser$ = this.currentUserSubject.asObservable();

  //Méthode temporaire car l'API ne renvoie pas de données utilisateurs
  private readonly VALID_USERNAME = 'bdessis';
  private readonly VALID_PASSWORD = 'DevBD3336++';

  constructor(private router: Router) {
    // Vérifie si un token existe dans le localStorage
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.isAuthenticatedSubject.next(true);
      // Récupérer le nom d'utilisateur stocké
      const username = localStorage.getItem('username');
      if (username) {
        this.currentUserSubject.next(username);
      }
    }
  }

  //fonction de vérification de l'authentification
  login(username: string, password: string): boolean {
    if (username === this.VALID_USERNAME && password === this.VALID_PASSWORD) {
      localStorage.setItem('auth_token', 'dummy_token');
      localStorage.setItem('username', username); // Stocker le nom d'utilisateur
      this.isAuthenticatedSubject.next(true);
      this.currentUserSubject.next(username);
      return true;
    }
    return false;
  }

  //fonction de déconnexion
  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next('');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
} 