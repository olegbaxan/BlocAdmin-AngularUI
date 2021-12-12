import { Component, OnInit } from '@angular/core';
import {PasswordService} from "../../../services/password.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  form: any = {
    oldpassword: null,
    newpassword:null,
    newpassword2:null
  };
  username:String;
  constructor(private passwordService: PasswordService,
              private router: Router,
              public tokenStorageService:TokenStorageService,)
  {
    this.tokenStorageService.getPersonData();
    this.username=tokenStorageService.loggedUserName;
  }

  ngOnInit(): void {

  }
  changePassword() {
    const {oldpassword,newpassword}=this.form;

    console.log("oldpassword",oldpassword);
    console.log("newpassword",newpassword);

    this.passwordService.changePassword(this.username, oldpassword,newpassword)
      .subscribe(
        response => {
          console.log("CHange",response);
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error);
          // this.router.navigate(['/login']);
          // this.router.navigate(['/forgotpassword']);
        });
  }
}
