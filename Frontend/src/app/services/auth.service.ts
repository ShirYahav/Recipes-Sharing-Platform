import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CredentialsModel } from '../models/credentials.model';
import { UserModel } from '../models/user.model';
import { loginAction, logoutAction, registerAction } from '../redux/auth-state';
import store from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public async register(user: UserModel): Promise<void> {
    const token = await firstValueFrom(this.http.post<string>(environment.registerUrl, user));
    store.dispatch(registerAction(token));
  }

  public async login(credentials: CredentialsModel): Promise<void> {
    const token = await firstValueFrom(this.http.post<string>(environment.loginUrl, credentials));
    store.dispatch(loginAction(token));
  }

  public logout(): void {
    store.dispatch(logoutAction());
  }

  public async isEmailTaken(user: UserModel): Promise<any> {
    const isTaken = await firstValueFrom(this.http.post<string>(environment.isTakenUrl, user));
    return isTaken;
  }

}
