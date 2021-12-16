import {Component, OnInit} from '@angular/core';
import {Building} from "../../../model/Building";
import {AddressService} from "../../../services/address.service";
import {BuildingService} from "../../../services/building.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {Location} from "@angular/common";
import {Address} from "../../../model/Address";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-building',
  templateUrl: './add-building.component.html',
  styleUrls: ['./add-building.component.css']
})
export class AddBuildingComponent implements OnInit {
  form: Building = {
    buildingid: undefined,
    flats: undefined,
    floors: undefined,
    address: new Address(),
  };
  isSuccessful = false;
  submitted = false;
  addresses: any = [];
  selectedAddress: any ;

  constructor(private buildingService: BuildingService,
              private addressService: AddressService,
              private _location: Location,
              public tokenStorageService:TokenStorageService,
              private router:Router)
{
  this.tokenStorageService.getPersonData();
}

  ngOnInit(): void {
    this.getAllAddresses();
  }

  private getAllAddresses(): void {
    this.buildingService.getAddresses()
      .subscribe(
        response => {
          this.addresses=[];
            this.addresses=response;
          // }
        },
        error => {
          console.log(error);
        });
    // return response;
  }

  saveBuilding(): void {
    const data = {
      buildingid: this.form.buildingid,
      floors: this.form.floors,
      flats: this.form.flats,
      address: this.selectedAddress,
    };

    this.buildingService.createBuilding(data)
      .subscribe(
        response => {
          console.log(response);
          this.isSuccessful = true;
          this.router.navigate(['/buildings']);
        },
        error => {
          console.log(error);
        });
  }

  newBuilding(): void {
    this.submitted = false;
    this.selectedAddress=undefined;
    this.form = {
      buildingid: undefined,
      flats: undefined,
      floors: undefined,
      address: undefined,

    };
  }

  backClicked() {
    this._location.back();
  }
}
