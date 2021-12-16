import { Component, OnInit } from '@angular/core';
import {parameters} from "../../../constants/constants";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../../services/token-storage.service";
import {Flat} from "../../../model/Flat";
import {FlatService} from "../../../services/flat.service";
import {Person} from "../../../model/Person";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-list-flat',
  templateUrl: './list-flat.component.html',
  styleUrls: ['./list-flat.component.css']
})
export class ListFlatComponent implements OnInit {
  flat: any;
  message = '';
  query = '';

  flats: Flat[]=[];
  currentIndex = -1;
  title = '';
  page = parameters.page;
  count = parameters.count;
  pageSize = parameters.pageSize;
  pageSizes = parameters.pageSizes;
  constructor(private flatService: FlatService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              public tokenStorageService:TokenStorageService,)
  {
    this.tokenStorageService.getPersonData();
  }

  ngOnInit(): void {
    this.retrieveFlats();
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

  retrieveFlats() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.flatService.getAll(params)
      .subscribe(
        response => {
          const {flats, totalItems} = response;
          this.flats = flats;
          this.count = totalItems;
        },
        error => {
          console.log(error);
          this.authService.logout(error.error.error);
        });
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveFlats();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveFlats();
  }


}
