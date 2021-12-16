import {Component, OnInit} from '@angular/core';
import {parameters} from '../../../constants/constants';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../../services/token-storage.service';
import {Payments} from '../../../model/Payments';
import {PaymentsService} from '../../../services/payments.service';

@Component({
  selector: 'app-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.css']
})
export class ListPaymentComponent implements OnInit {

  payment: any;
  message = '';
  query = '';

  payments: Payments[] = [];
  currentIndex = -1;
  title = '';
  page = parameters.page;
  count = parameters.count;
  pageSize = parameters.pageSize;
  pageSizes = parameters.pageSizes;

  constructor(private paymentsService: PaymentsService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              public tokenStorageService: TokenStorageService,) {
    this.tokenStorageService.getPersonData();
  }

  ngOnInit(): void {
    this.retrievePayments();
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

  retrievePayments() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.paymentsService.getAll(params)
      .subscribe(
        response => {
          const {payments, totalItems} = response;
          this.payments = payments;
          this.count = totalItems;
        },
        error => {
          console.log(error);
          this.authService.logout(error.error.error);
        });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrievePayments();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrievePayments();
  }

}
