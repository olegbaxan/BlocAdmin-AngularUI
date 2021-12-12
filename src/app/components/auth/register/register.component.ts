import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {PersonService} from "../../../services/person.service";
import {Location} from "@angular/common";
import {TokenStorageService} from "../../../services/token-storage.service";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    password2: null,
    description:null,
    name:null,
    surname:null,
    mobile:null,
    idnp:null,

  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  usernameExist:boolean=false;
  idnpExist:boolean=false;

  constructor(private authService: AuthService,
              private personService: PersonService,
              private tokenStorageService: TokenStorageService,
              private router:Router,
              private _location: Location,) { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    const { username, email, password,description,name,surname,idnp,mobile } = this.form;

    this.authService.register(username, email, password,description,name,surname,idnp,mobile).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        // this.router.navigate(['/login']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );setTimeout(()=>{
      if(this.tokenStorageService.isAdmin || this.tokenStorageService.isManager){
        this.router.navigate(['/person']);
      }else  this.router.navigate(['/login']);

    }, 50);
  }
  checkUsername(username: String|undefined):void {
    console.log("Check for Username");
    if((username) && (username?.length>3)){
      this.personService.checkUsername(username)
        .subscribe(
          response => {
            this.usernameExist=response;
            console.log("Username responce ", response)
          },
          error => {
            console.log(error);
          });
    }
  }
  checkIDNP(idnp: String|undefined):void {
    if((idnp) && (idnp?.length==13)){
      this.personService.checkIdnp(idnp)
        .subscribe(
          response => {
            this.idnpExist=response;
            console.log("IDNP responce ", response)
          },
          error => {
            console.log(error);
          });
    }
  }
  backClicked() {
    this._location.back();
  }


}
