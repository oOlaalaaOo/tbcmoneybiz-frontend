import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, debounceTime } from 'rxjs/operators';
import { handleError } from '../error-handler';

interface IMembershipFilter {
  key: string;
  value: any;
}

@Injectable()
export class MembershipService {
  public API_URL: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  public checkReferralLinkIfExists(code: string): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('referral_link', code);

    return this.httpClient
      .get<any>(`${this.API_URL}/membership/referral-link/exists`, {
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
      .get<any>(`${this.API_URL}/membership/transaction-hash/exists`, {
        params: params,
      })
      .pipe(catchError(handleError));
  }

  public getAll(
    offset: number,
    limit: number,
    filters: IMembershipFilter[] = []
  ): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('offset', String(offset));
    params = params.append('limit', String(limit));
    params = params.append('filters', JSON.stringify(filters));

    return this.httpClient
      .get<any>(`${this.API_URL}/membership/all`, {
        params: params,
      })
      .pipe(debounceTime(1000), catchError(handleError));
  }

  public getOne(membershipId: number) {
    return this.httpClient
      .post<any>(`${this.API_URL}/membership/${membershipId}`, {})
      .pipe(catchError(handleError));
  }

  public confirm(
    membershipId: number,
    markAskPaid: boolean = false
  ): Observable<any> {
    return this.httpClient
      .post<any>(`${this.API_URL}/membership/confirm`, {
        membership_id: membershipId,
        mark_as_paid: markAskPaid,
      })
      .pipe(catchError(handleError));
  }

  public markAsUnpaid(
    membershipId: number
  ): Observable<any> {
    return this.httpClient
      .post<any>(`${this.API_URL}/membership/unpaid`, {
        membership_id: membershipId,
      })
      .pipe(catchError(handleError));
  }

  public markAsPaid(
    membershipId: number
  ): Observable<any> {
    return this.httpClient
      .post<any>(`${this.API_URL}/membership/paid`, {
        membership_id: membershipId,
      })
      .pipe(catchError(handleError));
  }

  public deny(membershipId: number): Observable<any> {
    return this.httpClient
      .post<any>(`${this.API_URL}/membership/deny`, {
        membership_id: membershipId,
      })
      .pipe(catchError(handleError));
  }

  public pay(
    membershipId: number,
    btcValue: string,
    transactionHash: string
  ): Observable<any> {
    return this.httpClient
      .post<any>(`${this.API_URL}/membership/pay`, {
        membership_id: membershipId,
        btc_value: btcValue,
        transaction_hash: transactionHash,
      })
      .pipe(catchError(handleError));
  }

  public getStats(): Observable<any> {
    return this.httpClient
      .get<any>(`${this.API_URL}/membership/stats`)
      .pipe(catchError(handleError));
  }

  public getDownlines(userId: number, level: number): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('user_id', String(userId));
    params = params.append('level', String(level));

    return this.httpClient
      .get<any>(`${this.API_URL}/membership/downlines`, {
        params: params,
      })
      .pipe(catchError(handleError));
  }

  public getDetails(userId: number): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('user_id', String(userId));

    return this.httpClient
      .get<any>(`${this.API_URL}/membership/details`, {
        params: params,
      })
      .pipe(catchError(handleError));
  }
}
