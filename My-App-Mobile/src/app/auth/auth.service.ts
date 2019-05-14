import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

const loginURL = 'http:/localhost:4200/api/auth/login';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private httpClient: HttpClient) { }

  authenticate(username: string, password: string): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(loginURL, { username, password }, this.httpOptions)
      .pipe(
        tap(response => localStorage.setItem('token', response.token))
      );
  }
}
