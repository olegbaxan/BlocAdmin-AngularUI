import { Component, OnInit } from '@angular/core';
import {Person} from "../../../model/Person";
import {parameters} from "../../../constants/constants";
import {PersonService} from "../../../services/person.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../../services/token-storage.service";
import {Supplier} from "../../../model/Supplier";
import {SupplierService} from "../../../services/supplier.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-list-supplier',
  templateUrl: './list-supplier.component.html',
  styleUrls: ['./list-supplier.component.css']
})
export class ListSupplierComponent implements OnInit {

  supplier: any;
  message = '';
  query = '';

  suppliers: Supplier[] = [];
  currentIndex = -1;
  title = '';
  page = parameters.page;
  count = parameters.count;
  pageSize = parameters.pageSize;
  pageSizes = parameters.pageSizes;

  constructor(private supplierService: SupplierService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              public tokenStorageService:TokenStorageService,)
  {
    this.tokenStorageService.getPersonData();
  }

  ngOnInit(): void {
    this.retrieveSuppliers();
  }

  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveSuppliers() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.supplierService.getAll(params)
      .subscribe(
        response => {
          const {suppliers, totalItems} = response;
          this.suppliers = suppliers;

          this.count = totalItems;
        },
        error => {
          console.log(error);
          this.authService.logout(error.error.error);
        });
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveSuppliers();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveSuppliers();
  }
}
