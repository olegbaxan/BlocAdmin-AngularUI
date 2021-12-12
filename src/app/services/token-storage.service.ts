import { Injectable } from '@angular/core';
import {ActivatedRoute, Navigation, Router} from "@angular/router";

const TOKEN_KEY = 'auth-token';
const PERSON_KEY = 'auth-person';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  loggedUserID: string = '';
  loggedUserName: string = '';
  loggedUserRole: any='';
  isLoggedIn: boolean = false;
  isAdmin:boolean=false;
  isManager:boolean=false;
  constructor(private router: Router,
              private route: ActivatedRoute,
              ) {
    // this.getPersonData()
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public savePerson(person: any): void {
    window.sessionStorage.removeItem(PERSON_KEY);
    window.sessionStorage.setItem(PERSON_KEY, JSON.stringify(person));
  }

  public getPerson(): any {
    const person = window.sessionStorage.getItem(PERSON_KEY);
    if (person) {
      return JSON.parse(person);
    }
    return {};
  }
  getPersonData() {
    //initPersonData // private
    const person = window.sessionStorage.getItem(PERSON_KEY);
    if (person) {
      const personKey = JSON.parse(person);
      this.isLoggedIn=true;
      this.loggedUserID=personKey.id;
      this.loggedUserName=personKey.username;
      this.loggedUserRole=personKey.roles;
      for (let i=0;i<this.loggedUserRole.length;i++){
        switch (this.loggedUserRole[i]){
          case "ROLE_ADMIN": this.isAdmin=true ;break;
          case "ROLE_BLOCADMIN": this.isManager=true ;break;
        }
      }

    }else {
      this.router.navigate(['/login']);
    }

}}
