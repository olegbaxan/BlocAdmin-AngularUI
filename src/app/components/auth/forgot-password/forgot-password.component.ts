import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {PasswordService} from "../../../services/password.service";
import {EmailValidator} from "@angular/forms";
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  form: any = {
    email: null,
  };

  email: EmailValidator | undefined;
  isLoggedIn = false;
  roles: string[] = [];
  constructor(private passwordService: PasswordService,
              private tokenStorage: TokenStorageService,) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getPerson().roles;
    }
  }

  public sendEmail(email:any): void {
    window.close();
    this.passwordService.sendEmail(email)
      .subscribe(
        response => {

        },
        error => {
          console.log(error);
        });

  }
}
