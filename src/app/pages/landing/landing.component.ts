import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockchainService } from '../../core/api/blockchain/blockchain.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  public countryWithFlagList: Array<any> = [];
  public countryExchangeRateList: Array<any> = [];

  constructor(
    private router: Router,
    private blockchainService: BlockchainService
  ) {}

  ngOnInit(): void {
    const countryCodeList: Array<any> = this.blockchainService.getCountryCodeList();

    this.blockchainService.getBtcExchangeRates().subscribe((resp) => {
      const formattedCountryCodeList = countryCodeList.map((countryCode) => {
        return {
          code: countryCode,
          flag: this.getCountryFlagImg(countryCode),
          data: resp[countryCode],
        };
      });

      console.log(formattedCountryCodeList);
      this.countryExchangeRateList = [...formattedCountryCodeList];
    });
  }

  goToLogin(): void {
    this.router.navigate(['/user/auth/login']);
  }

  goToRegister(): void {
    this.router.navigate(['/user/auth/register']);
  }

  getCountryFlagImg(code: string) {
    const countryCode = this.blockchainService.getCountryCode(code);

    return `${environment.flagImgBaseUrl}${countryCode}/flat/64.png`;
  }
}
