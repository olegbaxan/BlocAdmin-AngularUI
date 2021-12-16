import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AddressService} from "../../../services/address.service";
import {Address} from "../../../model/Address";
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
  form: Address = {
    addressid: undefined,
    city: '',
    raion: '',
    street: '',
    houseNumber:'',
    entranceNo:undefined,
  };
  submitted = false;
  isSuccessful = false;

  constructor(private addressService: AddressService,
              private _location: Location,
              private router:Router) { }

  ngOnInit(): void {
  }

  saveAddress(): void {
    const data = {
      city: this.form.city,
      raion: this.form.raion,
      street:this.form.street,
      houseNumber: this.form.houseNumber,
      entranceNo: this.form.entranceNo,
    };

    this.addressService.createAddress(data)
      .subscribe(
        response => {
          console.log(response);
          this.isSuccessful = true
          this.router.navigate(['/address']);
        },
        error => {
          console.log(error);
        });
  }

  newAddress(): void {
    this.submitted = false;
    this.form = {
      addressid: undefined,
      city: '',
      raion: '',
      street:'',
      houseNumber: '',
      entranceNo:undefined,
    };
  }
  backClicked() {
    this._location.back();
  }
}
