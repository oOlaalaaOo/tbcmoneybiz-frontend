import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, debounceTime } from 'rxjs/operators';
import { handleError } from '../error-handler';

interface ICashoutFilter {
  key: string;
  value: any;
}

@Injectable()
export class CashoutService {
  public API_URL: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  public submit(
    membershipId: number,
    userId: number,
    unilevelPoints: number,
    interest: number
  ): Observable<any> {
    return this.httpClient
      .post<any>(`${this.API_URL}/cashout/submit`, {
        membership_id: membershipId,
        user_id: userId,
        unilevel_points: unilevelPoints,
        interest: interest,
      })
      .pipe(catchError(handleError));
  }

  public checkReferralLinkIfExists(code: string): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('referral_link', code);

    return this.httpClient
      .get<any>(`${this.API_URL}/cashout/referral-link/exists`, {
        params: params,
      })
      .pipe(catchError(handleError));
  }

  public checkTransactionHashIfExists(
    transactionHash: string
  ): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('transaction_hash', transactionHash);

    return this.httpClient
      .get<any>(`${this.API_URL}/cashout/transaction-hash/exists`, {
        params: params,
      })
      .pipe(catchError(handleError));
  }

  public getAll(
    offset: number,
    limit: number,
    filters: ICashoutFilter[] = []
  ): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('offset', String(offset));
    params = params.append('limit', String(limit));
    params = params.append('filters', JSON.stringify(filters));

    return this.httpClient
      .get<any>(`${this.API_URL}/cashout/all`, {
        params: params,
      })
      .pipe(debounceTime(1000), catchError(handleError));
  }

  public getOne(cashoutId: number) {
    return this.httpClient
      .post<any>(`${this.API_URL}/cashout/${cashoutId}`, {})
      .pipe(catchError(handleError));
  }

  public confirm(cashoutId: number, transactionHash: string, acceptedInterest: number, acceptedUnilevel: number): Observable<any> {
    return this.httpClient
      .post<any>(`${this.API_URL}/cashout/confirm`, {
        cashout_id: cashoutId,
        transaction_hash: transactionHash,
        accepted_interest: acceptedInterest,
        accepted_unilevel_points: acceptedUnilevel
      })
      .pipe(catchError(handleError));
  }

  public deny(cashoutId: number): Observable<any> {
    return this.httpClient
      .post<any>(`${this.API_URL}/cashout/deny`, {
        cashout_id: cashoutId,
      })
      .pipe(catchError(handleError));
  }

  public isAlreadyCashout(userId: number): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('user_id', String(userId));

    return this.httpClient
      .get<any>(`${this.API_URL}/cashout/user/already-cashout`, {
        params: params,
      })
      .pipe(debounceTime(1000), catchError(handleError));
  }
}
