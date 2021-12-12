import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentPerson: any;
  roles: string[] = [];

  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentPerson = this.token.getPerson();
    this.roles=this.currentPerson.roles;
  }

}
