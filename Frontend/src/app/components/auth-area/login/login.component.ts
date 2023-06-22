import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public user: UserModel;
  public credentials =  new CredentialsModel();

  constructor(
    private authService: AuthService,
    private router: Router,
    private notifyService: NotifyService,
  ) { }

  public async submit() {
    try {
      await this.authService.login(this.credentials);
      this.user = store.getState().authState.user;
      this.router.navigateByUrl("/home");
    }
    catch(err: any) {
      this.notifyService.error(err);
    }
  }

}
