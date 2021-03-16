import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { handleError } from '../error-handler';
import { Observable } from 'rxjs';

@Injectable()
export class BlockchainService {
  public API_URL: string = environment.apiUrl;
  // public headers: HttpHeaders = new HttpHeaders();

  constructor(private httpClient: HttpClient) {
    // this.headers.set('Content-type', ' multipart/form-data');
  }

  public getBtcValueFromUsd(usdAmount: string): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('usd_amount', usdAmount);

    return this.httpClient
      .get<any>(`${this.API_URL}/blockchain/usd-to-btc`, { params: params })
      .pipe(catchError(handleError));
  }

  public getBtcExchangeRates() {
    return this.httpClient
      .get<any>(environment.blockchainExchangeRatesApiUrl)
      .pipe(catchError(handleError));
  }

  public getCountryCode(code: string) {
    const codes = {
      AUD: 'AU',
      BRL: 'BR',
      CAD: 'CA',
      CHF: 'CH',
      CLP: 'CL',
      CNY: 'CN',
      DKK: 'DK',
      EUR: 'EU',
      GBP: 'UK',
      HKD: 'HK',
      INR: 'IN',
      ISK: 'IS',
      JPY: 'JP',
      KRW: 'KR',
      NZD: 'NZ',
      PLN: 'PL',
      RUB: 'RU',
      SEK: 'SE',
      SGD: 'SG',
      THB: 'TH',
      TRY: 'TR',
      TWD: 'TW',
      USD: 'US',
    };

    const flagCode: string =
      typeof codes[code] !== 'undefined' ? String(codes[code]) : '';

    return flagCode.toLowerCase();
  }

  public getCountryCodeList(): Array<any> {
    return [
      'AUD',
      'BRL',
      'CAD',
      'CHF',
      'CLP',
      'CNY',
      'DKK',
      'EUR',
      'GBP',
      'HKD',
      'INR',
      'ISK',
      'JPY',
      'KRW',
      'NZD',
      'PLN',
      'RUB',
      'SEK',
      'SGD',
      'THB',
      'TRY',
      'TWD',
      'USD',
    ];
  }
}
