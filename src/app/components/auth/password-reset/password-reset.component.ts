import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PasswordService} from "../../../services/password.service";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
token: string ="";
  form: any = {
    password: null
  };
  constructor( private route: ActivatedRoute,
               private router: Router,
               private passwordService: PasswordService,
               ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.token = params.token;
      });
  }
  resetPassword() {
    const {password,password2}=this.form;

    console.log("Pass",password);
    console.log("token",this.token);

    this.passwordService.resetPassword(this.token, password)
      .subscribe(
        response => {
          console.log("Reset",response);
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error);
          this.router.navigate(['/login']);
          // this.router.navigate(['/forgotpassword']);
        });
  }
}
