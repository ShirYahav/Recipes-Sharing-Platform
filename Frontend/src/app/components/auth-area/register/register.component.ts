import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public isTaken: boolean;
  public user = new UserModel();
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private notifyService: NotifyService,
    ) { }

  ngOnInit() {
  }

  public async isEmailTaken() {
    try {
      this.isTaken = await this.authService.isEmailTaken(this.user);

      if(this.isTaken) {
        this.isTaken = true;
      } else {
        this.isTaken = false;
      }
    }
    catch(err:any) {
      this.notifyService.error(err);
    }
  }
  

  public async submit() {
    try{
      await this.isEmailTaken();
      if(this.isTaken === false){
        await this.authService.register(this.user);
        this.router.navigateByUrl("/home");
        this.notifyService.success("Welcome To Our Recipes Platform");
      }else {
        this.notifyService.error('email is taken');
      }
    }
    catch(err:any) {
      this.notifyService.error(err);
    }
  }
}
