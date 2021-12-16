import {Component, Input, OnInit} from '@angular/core';
import {parameters} from '../../../constants/constants';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../../services/token-storage.service';
import {MeterData} from '../../../model/MeterData';
import {MeterdataService} from '../../../services/meterdata.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-list-meterdata',
  templateUrl: './list-meterdata.component.html',
  styleUrls: ['./list-meterdata.component.css']
})
export class ListMeterdataComponent implements OnInit {

  meterdata: any;
  message = '';
  query = '';

  metersdata: MeterData[] = [];
  currentIndex = -1;
  title = '';

  page = parameters.page;
  count = parameters.count;
  pageSize = parameters.pageSize;
  pageSizes = parameters.pageSizes;

  constructor(private meterdataService: MeterdataService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              public tokenStorageService: TokenStorageService,) {
    this.tokenStorageService.getPersonData();
  }

  ngOnInit(): void {
    this.retrieveMeterData();
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

  retrieveMeterData() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.meterdataService.getAll(params)
      .subscribe(
        response => {
          const {meterData, totalItems} = response;
          this.metersdata = meterData;
          this.count = totalItems;
        },
        error => {
          console.log(error);
          this.authService.logout(error.error.error);
        });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveMeterData();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveMeterData();
  }
}
