import { Component, OnInit } from '@angular/core';
import {Person} from "../../../model/Person";
import {Supplier} from "../../../model/Supplier";
import {Address} from "../../../model/Address";
import {any} from "codelyzer/util/function";
import {SupplierService} from "../../../services/supplier.service";
import {AddressService} from "../../../services/address.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {Building} from "../../../model/Building";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {
  form: Supplier = {
    supplierid: undefined,
    supplierName: '',
    fiscalCode: '',
    bankCode: '',
    details: '' ,
    iban: '',
    address: new Address(),
  };

  submitted = false;
  addresses:any = [];
  selectedAddress:any=[];
  isSuccessful = false;

  constructor(private supplierService: SupplierService,
              private addressService: AddressService,
              public tokenStorageService:TokenStorageService,
              private router:Router,
              private _location: Location,)
  {
    this.tokenStorageService.getPersonData();
  }

  ngOnInit(): void {
    this.getAllAddresses();
  }

  private getAllAddresses():void {
    this.supplierService.getAddresses()
      .subscribe(
        response => {
          this.addresses=[];
          this.addresses = response;
          console.log("address",this.addresses);
          console.log("responce",response);
        },
        error => {
          console.log(error);
        });
    // return response;
  }
  saveSupplier(): void {
    console.log("this.selectedAddress",this.selectedAddress);
    const data = {
      supplierName: this.form.supplierName,
      fiscalCode: this.form.fiscalCode,
      bankCode: this.form.bankCode,
      iban: this.form.iban,
      details: this.form.details,
      address: this.selectedAddress,
    };

    this.supplierService.createSupplier(data)
      .subscribe(
        response => {
          console.log(response);
          this.isSuccessful = true
          this.router.navigate(['/suppliers']);
        },
        error => {
          console.log(error);
        });
  }
  // newSupplier(): void {
  //   this.submitted = false;
  //
  //   this.form = {
  //     supplierid: undefined,
  //     supplierName: '',
  //     bankCode: '',
  //     fiscalCode: '',
  //     iban: '',
  //     details: '',
  //     address:undefined,
  //   };
  // }
  backClicked() {
    this._location.back();
  }

}
