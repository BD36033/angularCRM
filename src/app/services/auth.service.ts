import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private isAdminAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<string>('');

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  isAdminAuthenticated$ = this.isAdminAuthenticatedSubject.asObservable();
  currentUser$ = this.currentUserSubject.asObservable();

  private readonly VALID_USERNAME = 'user1';
  private readonly VALID_PASSWORD = 'pdw123';
  private readonly VALID_ADMIN_USERNAME = 'bdessis';
  private readonly VALID_ADMIN_PASSWORD = 'DevBD3336++';

  constructor(private router: Router) {
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    const isAdminAuth = localStorage.getItem('isAdminAuthenticated') === 'true';
    const currentUser = localStorage.getItem('currentUser') || '';
    
    this.isAuthenticatedSubject.next(isAuth);
    this.isAdminAuthenticatedSubject.next(isAdminAuth);
    this.currentUserSubject.next(currentUser);
  }

  login(username: string, password: string): boolean {
    if (username === this.VALID_USERNAME && password === this.VALID_PASSWORD) {
      this.isAuthenticatedSubject.next(true);
      this.currentUserSubject.next(username);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', username);
      return true;
    }
    return false;
  }

  loginAdmin(username: string, password: string): boolean {
    if (username === this.VALID_ADMIN_USERNAME && password === this.VALID_ADMIN_PASSWORD) {
      this.isAdminAuthenticatedSubject.next(true);
      this.currentUserSubject.next(username);
      localStorage.setItem('isAdminAuthenticated', 'true');
      localStorage.setItem('currentUser', username);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.isAdminAuthenticatedSubject.next(false);
    this.currentUserSubject.next('');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isAdminAuthenticated');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  isAdminAuthenticated(): boolean {
    return this.isAdminAuthenticatedSubject.value;
  }
} 