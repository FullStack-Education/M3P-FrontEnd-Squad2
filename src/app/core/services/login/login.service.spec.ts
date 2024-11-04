import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpTestingController } from '@angular/common/http/testing';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('deve logar e o token ser armazenado no sessionstorage', () => {
    const mockLoginResponse = { token: 'mock-token', tempoExpiracao: 3600 };

    service.login({ email: 'test@example.com', senha: '123456789' }).subscribe(response => {
      expect(response.token).toEqual('mock-token');
      expect(sessionStorage.getItem('token')).toEqual('mock-token');
    });

    const req = httpMock.expectOne('/api/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockLoginResponse);
  });

  it('deve lançar um erro', () => {
    service.login({ email: 'test@example.com', senha: '1212121212' }).subscribe({
      next: () => fail('deve mostrar erro 400'),
      error: (error) => {
        expect(error).toBeTruthy();
        expect(sessionStorage.getItem('token')).toBeNull();
      }
    });

    const req = httpMock.expectOne('/api/login');
    req.error(new ErrorEvent('Login failed'), { status: 400 });
  });
});
