import {Component, OnInit} from '@angular/core';
import {AddressService} from "../../../services/address.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Address} from "../../../model/Address";
import {Location} from "@angular/common";

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {

  title="Edit address form";
  address= new Address;
  message = '';
  isSuccessful = false;
  constructor(
    private addressService: AddressService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,

  ) {}


  ngOnInit(): void {
    this.message = '';
    this.getAddressById(this.route.snapshot.paramMap.get('id'));
  }

  private getAddressById(id: string | number | null):void {
    this.addressService.getById(id)
      .subscribe(
        data => {
          this.address = data;
        },
        error => {
          console.log(error);
        });
  }
  updateAddress(playlistForm: { reset: () => void; }): void {
    this.addressService.editAddress(this.address?.addressid, this.address)
      .subscribe(
        response => {
          this.isSuccessful = true
          this.message = 'The address was updated successfully!';
        },
        error => {
          console.log(error);
        });
    setTimeout(()=>{
      playlistForm.reset();
      this.router.navigate(['/address']);
    }, 1000);
  }
  updatePublished(status: any): void {
    const data = {
      title: this.address?.title,
      description: this.address?.city,
      published: status
    };

    this.addressService.editAddress(this.address?.addressid, data)
      .subscribe(
        response => {
          // @ts-ignore
          this.address?.published = status;
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
