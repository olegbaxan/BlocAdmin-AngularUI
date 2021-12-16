import {Component, Injectable, OnInit} from '@angular/core';
import {EditAddressComponent} from "../edit-address/edit-address.component";
import {AddressService} from "../../../services/address.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Address} from "../../../model/Address";
import {parameters} from "../../../constants/constants";
import {AuthService} from "../../../services/auth.service";
import {TokenStorageService} from "../../../services/token-storage.service";



@Component({
  selector: 'app-list-address',
  templateUrl: './list-address.component.html',
  styleUrls: ['./list-address.component.css'],
})
@Injectable({providedIn:EditAddressComponent})
export class ListAddressComponent implements OnInit {


  address:any;
  message = '';
  query = '';
  isLoggedIn:any;

  addresses: Address[] = [];
  currentIndex = -1;
  title = '';

  page = parameters.page;
  count = parameters.count;
  pageSize = parameters.pageSize;
  pageSizes = parameters.pageSizes;



  constructor(
    private addressService: AddressService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public tokenStorageService:TokenStorageService,) {
    this.tokenStorageService.getPersonData();
  };

  ngOnInit(): void {
    this.retrieveAddresses();


  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page-1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveAddresses(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.addressService.getAll(params)
      .subscribe(
        response => {
          const { addresses, totalItems } = response;
          this.addresses = addresses;
          this.count = totalItems;
        },
        error => {
          console.log(error);
          this.authService.logout(error.error.error);
        });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveAddresses();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveAddresses();
  }

  deleteAddress(id: number) {
    this.addressService.deleteAddress(id)
      .subscribe(() => {
          this.message = 'The person was deleted successfully!';
          this.addresses.splice(id, 1);
          this.ngOnInit()
        }
        , (error) => {
          console.error(error);
        });
  }
}
