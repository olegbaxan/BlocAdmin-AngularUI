import { Component, OnInit } from '@angular/core';
import {PersonService} from "../../../services/person.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SupplierService} from "../../../services/supplier.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {Location} from "@angular/common";
import {Supplier} from "../../../model/Supplier";

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.css']
})
export class EditSupplierComponent implements OnInit {
  title="Edit supplier form";
  supplier=new Supplier();
  message = '';
  addresses:any = [];
  selectedAddress:any=[];
  isSuccessful = false;

  constructor(private supplierService: SupplierService,
              private route: ActivatedRoute,
              private router: Router,
              public tokenStorageService:TokenStorageService,
              private _location: Location,)
  {
    this.tokenStorageService.getPersonData();
  }

  ngOnInit(): void {
    this.message = '';

    this.getSupplierById(this.route.snapshot.paramMap.get('id'));
    this.getAllAddresses();
  }
  private getAllAddresses():void {
    this.supplierService.getAddresses()
      .subscribe(
        response => {
          this.addresses=[];
          for (let item in response) {
            if(!response[item].entranceNo){
              response[item].bindName = response[item].city + " " + response[item].raion+ " " + response[item].street+ " " + response[item].houseNumber
            }
            else {
              response[item].bindName = response[item].city + " " + response[item].raion+ " " + response[item].street+ " " + response[item].houseNumber+"/"+response[item].entranceNo;
            }
            this.addresses.push(response[item]);
          }
        },
        error => {
          console.log(error);
        });
  }
  private getSupplierById(id: string | number | null):void {
    this.supplierService.getById(id)
      .subscribe(
        data => {
          if(!data.address.entranceNo){
            data.address.bindName = data.address.city + " " + data.address.raion+ " " + data.address.street+ " " + data.address.houseNumber;
          }
          else {
            data.address.bindName = data.address.city + " " + data.address.raion+ " " + data.address.street+ " " + data.address.houseNumber+"/"+data.address.entranceNo;
          }
          this.supplier = data;
          this.selectedAddress=data.address;

        },
        error => {
          console.log(error);
        });
  }
  updateSupplier(playlistForm: { reset: () => void; }): void {
    this.supplier.address=this.selectedAddress;
    this.supplierService.editSupplier(this.supplier.supplierid, this.supplier)
      .subscribe(
        response => {
          this.isSuccessful = true
          this.message = 'The building was updated successfully!';
        },
        error => {
          console.log(error);
        });
    setTimeout(()=>{
      playlistForm.reset();
      this.router.navigate(['/suppliers']);
    }, 1000);
  }
  updatePublished(status: any): void {
    const data = {
      title: this.supplier.title,
      description: this.supplier.supplierName,
      published: status
    };

    this.supplierService.editSupplier(this.supplier.supplierid, data)
      .subscribe(
        response => {
          this.supplier.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }
  backClicked() {
    this._location.back();
  }
}
