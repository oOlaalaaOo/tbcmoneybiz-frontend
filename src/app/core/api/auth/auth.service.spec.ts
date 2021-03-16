import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../../../models/user.model';
import { UserDetailModel } from '../../../models/user-detail.model';

describe('AuthService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('#loginApi should return expected result', () => {
    const expectedResponse = {
      success: true,
      accessToken: 'blablabla',
    };

    authService.login('test@email.com', 'qwerty').subscribe((resp) => {
      console.log(resp);
      expect(resp).toEqual(expectedResponse, 'should return expected response');
    });

    const request = httpTestingController.expectOne(
      `${authService.API_URL}/auth/login`
    );

    expect(request.request.method).toBe('POST');
    expect(Object.keys(request.request.body)).toContain('email');
    expect(Object.keys(request.request.body)).toContain('password');

    request.flush(expectedResponse);
  });

  it('#registerApi should return expected result', () => {
    const expectedResponse = {
      success: true,
      data: {
        user: {} as UserModel,
        userDetail: {} as UserDetailModel,
      },
    };

    authService
      .register('test@email.com', 'qwerty', 'test')
      .subscribe((resp) => {
        expect(resp).toEqual(
          expectedResponse,
          'should return expected response'
        );
      });

    const request = httpTestingController.expectOne(
      `${authService.API_URL}/auth/register`
    );

    expect(request.request.method).toBe('POST');
    expect(Object.keys(request.request.body)).toContain('email');
    expect(Object.keys(request.request.body)).toContain('password');
    expect(Object.keys(request.request.body)).toContain('name');

    request.flush(expectedResponse);
  });
});
