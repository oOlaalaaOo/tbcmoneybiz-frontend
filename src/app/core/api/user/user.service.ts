import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { handleError } from '../error-handler';

interface IMemberFilter {
  key: string;
  value: any;
  requesting_by_admin?: boolean;
}

@Injectable()
export class UserService {
  public API_URL: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  public checkEmailIfExists(email: string): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('email', email);

    return this.httpClient
      .get<any>(`${this.API_URL}/user/email/exists`, {
        params: params,
      })
      .pipe(catchError(handleError));
  }

  public getAll(
    offset: number,
    limit: number,
    filters: IMemberFilter[],
    requestingByAdmin: boolean = false
  ): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('offset', String(offset));
    params = params.append('limit', String(limit));
    params = params.append('filters', JSON.stringify(filters));
    params = params.append('requesting_by_admin', String(requestingByAdmin));

    return this.httpClient
      .get<any>(`${this.API_URL}/user/all`, {
        params: params,
      })
      .pipe(catchError(handleError));
  }

  public getOne(userId: number): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('id', String(userId));

    return this.httpClient
      .get<any>(`${this.API_URL}/user/show`, {
        params: params,
      })
      .pipe(catchError(handleError));
  }

  public confirm(membershipId: number): Observable<any> {
    return this.httpClient
      .post<any>(`${this.API_URL}/membership/confirm`, {
        membership_id: membershipId,
      })
      .pipe(catchError(handleError));
  }

  public getStats(): Observable<any> {
    return this.httpClient
      .get<any>(`${this.API_URL}/user/stats`)
      .pipe(catchError(handleError));
  }

  public updateAccountDetails(
    userId: number,
    name: string,
    email: string,
    btcWallet: string
  ): Observable<any> {
    return this.httpClient
      .post<any>(`${this.API_URL}/user/update`, {
        email: email,
        name: name,
        btc_wallet: btcWallet,
        id: userId
      })
      .pipe(catchError(handleError));
  }

  public updateAccountPassword(
    userId: number,
    oldPassword: string,
    newPassword: string
  ): Observable<any> {
    return this.httpClient
      .post<any>(`${this.API_URL}/user/change-password`, {
        old_password: oldPassword,
        new_password: newPassword,
        user_id: userId,
      })
      .pipe(catchError(handleError));
  }
}
