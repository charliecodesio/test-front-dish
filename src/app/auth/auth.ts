import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://g6wpg9ox8i.execute-api.us-east-1.amazonaws.com/dev';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, {
      username,
      password,
    }).pipe(
      tap((res) => {
        this.setAccessToken(res.access_token);
        this.setRefreshTokenCookie(res.refresh_token);
      })
    );
  }

  refreshToken(): Observable<{ access_token: string }> {
    const refresh_token = this.getRefreshTokenFromCookie();
    return this.http
      .post<{ access_token: string }>(`${this.apiUrl}/auth/refresh`, { refresh_token })
      .pipe(tap((res) => this.setAccessToken(res.access_token)));
  }

  logout(): void {
    this.clearAccessToken();
    this.deleteRefreshTokenCookie();
    this.router.navigate(['/login']);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  private setAccessToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  private clearAccessToken() {
    localStorage.removeItem('access_token');
  }

  private setRefreshTokenCookie(token: string) {
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    document.cookie = `refresh_token=${token}; expires=${expires.toUTCString()}; path=/; secure`;
  }

  private getRefreshTokenFromCookie(): string | null {
    const match = document.cookie.match(new RegExp('(^| )refresh_token=([^;]+)'));
    return match ? match[2] : null;
  }

  private deleteRefreshTokenCookie() {
    document.cookie = 'refresh_token=; Max-Age=0; path=/; secure';
  }
}
