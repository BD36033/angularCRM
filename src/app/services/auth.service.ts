import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private isAdminAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  isAdminAuthenticated$ = this.isAdminAuthenticatedSubject.asObservable();

  private readonly VALID_USERNAME = 'user1';
  private readonly VALID_PASSWORD = 'pdw123';
  private readonly VALID_ADMIN_USERNAME = 'bdessis';
  private readonly VALID_ADMIN_PASSWORD = 'DevBD3336++';

  constructor(private router: Router) {
    const token = localStorage.getItem('auth_token');
    const adminToken = localStorage.getItem('admin_auth_token');
    
    if (token) {
      this.isAuthenticatedSubject.next(true);
    }
    if (adminToken) {
      this.isAdminAuthenticatedSubject.next(true);
    }
  }

  login(username: string, password: string): boolean {
    if (username === this.VALID_USERNAME && password === this.VALID_PASSWORD) {
      localStorage.setItem('auth_token', 'user_token');
      this.isAuthenticatedSubject.next(true);
      return true;
    }
    return false;
  }

  loginAdmin(username: string, password: string): boolean {
    if (username === this.VALID_ADMIN_USERNAME && password === this.VALID_ADMIN_PASSWORD) {
      localStorage.setItem('admin_auth_token', 'admin_token');
      this.isAdminAuthenticatedSubject.next(true);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('admin_auth_token');
    this.isAuthenticatedSubject.next(false);
    this.isAdminAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  isAdminAuthenticated(): boolean {
    return this.isAdminAuthenticatedSubject.value;
  }
} 