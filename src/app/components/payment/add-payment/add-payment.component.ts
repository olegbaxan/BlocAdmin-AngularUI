import {Component, OnInit} from '@angular/core';
import {FlatService} from '../../../services/flat.service';
import {Payments} from '../../../model/Payments';
import {Flat} from '../../../model/Flat';
import {PaymentsService} from '../../../services/payments.service';
import {TokenStorageService} from '../../../services/token-storage.service';
import {Invoice} from '../../../model/Invoice';
import {InvoiceService} from '../../../services/invoice.service';
import {MeterdataService} from '../../../services/meterdata.service';
import {Status} from '../../../model/Status';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {
  submitted = false;
  persons: any = [];
  flats: Flat[];
  payments: Payments[];
  invoices: Invoice[] = [];
  updatedFlat: Flat | undefined;
  status: Status[] = [];
  message: string = '';
  showMsg = false;
  selectedPerson: any = [];
  selectedFlats: any;
  isSuccessful = false;

  constructor(private paymentService: PaymentsService,
              private flatService: FlatService,
              private meterdataService: MeterdataService,
              private invoiceService: InvoiceService,
              public tokenStorageService: TokenStorageService,
              private _location: Location,
              private router: Router,
              private authService: AuthService,) {
    this.tokenStorageService.getPersonData();
    this.payments = [];
    this.flats = [];
  }

  ngOnInit(): void {
    this.getAllPersons();
    this.getAllStatus();
  }

  private getAllPersons(): void {
    this.paymentService.getPersons()
      .subscribe(
        response => {
          this.persons = [];
          for (let item in response) {
            response[item].bindName = response[item].name + ' ' + response[item].surname;
            this.persons.push(response[item]);

          }
        },
        error => {
          console.log(error);
          this.authService.logout(error.error.error);
        });
  }


  getPersonFlats(): void {
    this.paymentService.getPersonFlats(this.selectedPerson.personid)
      .subscribe(
        response => {
          this.flats = [];
          this.invoices = [];
          for (let item in response) {
            response[item].bindName = response[item].flatNumber + ' ' + response[item].building.address.city;
            this.flats.push(response[item]);
            this.getFlatInvoices(response[item].flatid);
          }
          this.initPayments();
        },
        error => {
          console.log(error);
        });
  }

  getFlatInvoices(flatid: any): void {
    this.paymentService.getFlatInvoices(flatid)
      .subscribe(
        response => {
          for (let item in response) {
            response[item].bindName = response[item].invoiceId + ' ' + response[item].emittedDate;
            this.invoices.push(response[item]);

          }
        },
        error => {
          console.log(error);
        });
  }

  initPayments() {

    this.payments = [];
    this.flats?.forEach((flat) => {
      let payment = new Payments();
      payment.flat = flat;
      payment.person = this.selectedPerson;
      payment.sum = 0;
      this.payments.push(payment);
    });
  }

  savePayment(): void {
    console.log(this.payments);
    this.paymentService.createPayments(this.payments)
      .subscribe(
        response => {
          console.log(response);
          this.isSuccessful = true;
          this.router.navigate(['/payments']);
        },
        error => {
          console.log(error);
        });
  }
  newPayment(): void {
    this.initPayments();
  }

  private getAllStatus(): void {
    this.meterdataService.getStatus()
      .subscribe(
        response => {
          this.status = [];
          this.status = response;
        },
        error => {
          console.log(error);
        });
    // return response;
  }

  backClicked() {
    this._location.back();
  }

}
