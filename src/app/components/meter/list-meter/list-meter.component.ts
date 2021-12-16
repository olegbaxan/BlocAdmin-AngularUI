import {Component, OnInit} from '@angular/core';
import {parameters} from '../../../constants/constants';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../../services/token-storage.service';
import {Meter} from '../../../model/Meter';
import {MeterService} from '../../../services/meter.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-list-meter',
  templateUrl: './list-meter.component.html',
  styleUrls: ['./list-meter.component.css']
})
export class ListMeterComponent implements OnInit {

  meter: any;
  message = '';
  query = '';

  meters: Meter[] = [];
  currentIndex = -1;
  title = '';

  page = parameters.page;
  count = parameters.count;
  pageSize = parameters.pageSize;
  pageSizes = parameters.pageSizes;

  constructor(private meterService: MeterService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              public tokenStorageService: TokenStorageService,) {
    this.tokenStorageService.getPersonData();
  }

  ngOnInit(): void {
    this.retrieveMeters();
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

  retrieveMeters() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.meterService.getAll(params)
      .subscribe(
        response => {
          const {meters, totalItems} = response;
          this.meters = meters;
          this.count = totalItems;
        },
        error => {
          console.log(error);
          this.authService.logout(error.error.error);
        });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveMeters();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveMeters();
  }
}
