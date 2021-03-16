import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { handleError } from '../error-handler';
import { Observable } from 'rxjs';

interface IAuthRegister {
  email: string;
  password: string;
  name: string;
  referrerCode: string;
  transactionHash: string;
  adminBtcWallet: string;
  btcValue: string;
}

interface IAuthLogin {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  public API_URL: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  public login(data: IAuthLogin): Observable<any> {
    return this.httpClient
      .post<any>(`${this.API_URL}/auth/login`, {
        email: data.email,
        password: data.password,
      })
      .pipe(catchError(handleError));
  }

  public loginAdmin(data: IAuthLogin): Observable<any> {
    return this.httpClient
      .post<any>(`${this.API_URL}/auth/admin/login`, {
        email: data.email,
        password: data.password,
      })
      .pipe(catchError(handleError));
  }

  public register(data: IAuthRegister): Observable<any> {
    return this.httpClient
      .post<any>(`${this.API_URL}/auth/register`, {
        email: data.email,
        password: data.password,
        name: data.name,
        referral_id: data.referrerCode,
        admin_btc_wallet: data.adminBtcWallet,
        btc_value: data.btcValue,
        transaction_hash: data.transactionHash,
      })
      .pipe(catchError(handleError));
  }

  storeAccessToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  }

  storeUserDetails(user: any) {
    localStorage.setItem('userDetails', JSON.stringify(user));
  }

  getAccessToken(): string {
    return localStorage.getItem('accessToken');
  }

  hasLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userDetails');
  }
}
