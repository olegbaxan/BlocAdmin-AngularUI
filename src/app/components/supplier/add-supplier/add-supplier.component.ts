import {Component, OnInit} from '@angular/core';
import {Supplier} from '../../../model/Supplier';
import {Address} from '../../../model/Address';
import {SupplierService} from '../../../services/supplier.service';
import {AddressService} from '../../../services/address.service';
import {TokenStorageService} from '../../../services/token-storage.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

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
    details: '',
    iban: '',
    address: new Address(),
  };

  submitted = false;
  addresses: any = [];
  selectedAddress: any = [];
  isSuccessful = false;

  constructor(private supplierService: SupplierService,
              private addressService: AddressService,
              public tokenStorageService: TokenStorageService,
              private router: Router,
              private _location: Location,) {
    this.tokenStorageService.getPersonData();
  }

  ngOnInit(): void {
    this.getAllAddresses();
  }

  private getAllAddresses(): void {
    this.supplierService.getAddresses()
      .subscribe(
        response => {
          this.addresses = [];
          this.addresses = response;
        },
        error => {
          console.log(error);
        });
  }

  saveSupplier(): void {
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
          this.isSuccessful = true;
          this.router.navigate(['/suppliers']);
        },
        error => {
          console.log(error);
        });
  }
  backClicked() {
    this._location.back();
  }

}
