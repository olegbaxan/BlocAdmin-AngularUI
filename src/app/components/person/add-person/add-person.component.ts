import {Component, OnInit} from '@angular/core';
import {Address} from "../../../model/Address";
import {Person} from "../../../model/Person";
import {AddressService} from "../../../services/address.service";
import {PersonService} from "../../../services/person.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../../services/token-storage.service";
import {window} from "rxjs/operators";

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {

  person: Person = {
    personid: undefined,
    username: '',
    name: '',
    surname: '',
    email: '',
    description: '',
    phone: '',
    mobile: '',
    idnp: '',

  };
  usernameExist=false;
  idnpExist=false;
  submitted = false;
  roles:any = [];
  selectedRoles:any=[];

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private personService: PersonService,
              private authService: AuthService,
              private router:Router,
              public tokenStorageService:TokenStorageService,)
  {
    this.tokenStorageService.getPersonData();
  }

  ngOnInit(): void {
    this.getAllRoles();
  }
  private getAllRoles():void {
    this.personService.getRoles()
      .subscribe(
        response => {
          this.roles=[];
          for (let item in response) {
              if (response[item].name === "ROLE_USER") {
                response[item].bindName = response[item].name;
                this.roles.push(response[item]);
              }

          }
          console.log("Roles",this.roles)
        },
        error => {
          console.log(error);
        });
  }
  savePerson(): void {
    const data = {
      username: this.person.username,
      name: this.person.name,
      surname: this.person.surname,
      email: this.person.email,
      description: this.person.description,
      phone: this.person.phone,
      mobile: this.person.mobile,
      idnp: this.person.idnp,
      roles:this.selectedRoles,
    };

    // this.personService.createPerson(data)
    //   .subscribe(
    //     response => {
    //       console.log(response);
    //       this.submitted = true;
    //     },
    //     error => {
    //       console.log(error);
    //     });
  //  username, email, password,description,name,surname,idnp,mobile
    this.authService.register(this.person.username, this.person.email, Math.random().toString(36).slice(-8)
      ,this.person.description,this.person.name,this.person.surname,this.person.idnp,this.person.mobile)
      .subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
    setTimeout(()=>{
      this.router.navigate(['/login']);
    }, 2000);
  }
  newPerson(): void {
    this.submitted = false;
    this.person = {
      personid: undefined,
      username: '',
      name: '',
      surname: '',
      email: '',
      description: '',
      phone: '',
      mobile: '',
      idnp: '',
    };
  }

  checkUsername(username: String|undefined):void {
    if((username) && (username?.length>4)){
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
            console.log("Username responce ", response)
          },
          error => {
            console.log(error);
          });
    }
  }
}

