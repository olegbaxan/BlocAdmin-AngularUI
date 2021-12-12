import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AddressService} from "../../../services/address.service";
import {Address} from "../../../model/Address";
import {Location} from "@angular/common";
import {Building} from "../../../model/Building";
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

// export class AddAddressComponent implements OnInit {
//
//   title="Add address form";
//   city='';
//   raion='';
//   street='';
//   houseNumber='';
//   formdata:FormGroup;
//
//   constructor(private addressService: AddressService) {
//     this.formdata=new FormGroup({})
//   }
//
//   ngOnInit(): void {
//     this.formdata = new FormGroup({
//       city: new FormControl("",Validators.required),
//       raion: new FormControl("",Validators.required),
//       street: new FormControl("",Validators.required),
//       houseNumber: new FormControl("",[Validators.required,Validators.maxLength(10)]),
//     });
//   }
//   createAddress(data:any){
//       this.addressService.createAddress(data)
//         .subscribe(() => {
//             this.city = data.city;
//             this.raion = data.raion;
//             this.street = data.street;
//             this.houseNumber = data.houseNumber;
//           }
//           , (error) => {
//             console.error(error);
//           }
//         );
//       setTimeout(() => {
//         this.formdata.reset();
//       }, 1000);
//     }
//   }
