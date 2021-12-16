import {Component, OnInit} from '@angular/core';
import {PersonService} from '../../../services/person.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../services/token-storage.service';
import {Person} from '../../../model/Person';
import {InvoiceService} from '../../../services/invoice.service';
import {Invoice} from '../../../model/Invoice';
import {Parser} from '@angular/compiler';
import {PaymentsService} from '../../../services/payments.service';
import {Payments} from '../../../model/Payments';
import {Location} from '@angular/common';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  person: Person | undefined;
  invoices: Invoice[] = [];
  invoicesS: Invoice[] = [];
  payments: Payments[] = [];
  showModal: boolean = false;
  showModalS: boolean = false;
  showModalPay: boolean = false;
  showModalPerson: boolean = false;
  content: any;
  title: any;
  selectedInvoice: Invoice | undefined;
  selectedInvoiceS: Invoice | undefined;
  selectedPayment: Payments | undefined;


  constructor(private personService: PersonService,
              private invoiceService: InvoiceService,
              private paymentsService: PaymentsService,
              private authService: AuthService,
              private router: Router,
              private _location: Location,
              public tokenStorageService: TokenStorageService) {
    this.tokenStorageService.getPersonData();
  }

  ngOnInit(): void {
    this.personService.getPublicContent().subscribe(
      data => {
        this.content = data;

      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
    if (this.tokenStorageService.loggedUserRole == 'ROLE_ADMIN') {
      this.router.navigate(['/home/admin']);
    }
    if (this.tokenStorageService.loggedUserRole == 'ROLE_BLOCADMIN') {
      this.router.navigate(['/home/blocadmin']);
    }

    this.getPersonById(this.tokenStorageService.loggedUserID);
    this.getPersonInvoices(this.tokenStorageService.loggedUserID);
    this.getSupplierInvoices(this.tokenStorageService.loggedUserID);
    this.getPayments(this.tokenStorageService.loggedUserID);
    // this.getMeters(this.tokenStorageService.loggedUserID);
  }

  private getPersonById(id: string | number | null): void {
    this.personService.getById(id)
      .subscribe(
        data => {
          this.person = data;
        },
        error => {
          console.log(error);
          this.authService.logout(error.error.error);
        });
  }

  updatePerson(playlistForm: { reset: () => void; }): void {
    this.personService.editPerson(this.person?.personid, this.person)
      .subscribe(
        response => {
        },
        error => {
          console.log(error);
        });
    setTimeout(() => {
      this.hideModals();
      this.router.navigate(['/home']);

    }, 50);
  }

  private getPersonInvoices(loggedUserID: any) {
    this.invoiceService.getInvoicesByPersonId(loggedUserID)
      .subscribe(
        data => {
          for (let i = 0; i < 10; i++) {
            if (data[i]) {
              this.invoices.push(data[i]);
            }
          }

        },
        error => {
          console.log(error);
        });
  }

  private getSupplierInvoices(loggedUserID: any) {
    this.invoiceService.getInvoicesBySuppliers(loggedUserID)
      .subscribe(
        data => {
          this.invoicesS = data;
          this.getInvoiceFileInfo();
        },
        error => {
          console.log(error);
        });
  }

  private getPayments(loggedUserID: any) {
    this.paymentsService.getPersonPayments(loggedUserID)
      .subscribe(
        data => {
          this.payments = data;
        },
        error => {
          console.log(error);
        });
  }

  getInvoiceFileInfo(): void {
    for (let item in this.invoicesS) {

      if (this.invoicesS[item].invoiceFileId) {

        this.invoiceService.getFilesById(this.invoicesS[item].invoiceFileId)
          .subscribe(
            response => {
              const {invoiceFile, fileInfo} = response;
              this.invoicesS[item].invoiceFile = invoiceFile;
              this.invoicesS[item].fileInfo = fileInfo[0];
            },
            error => {
              console.log(error);
            });
      }
    }

  }

  //Bootstrap Modal Open event
  showInvoices(id: any) {
    this.showModal = true; // Show-Hide Modal Check
    this.selectedInvoiceS = undefined;
    this.selectedInvoice = this.invoices[id];

  }

  showInvoicesS(id: any) {
    this.showModalS = true; // Show-Hide Modal Check
    this.selectedInvoice = undefined;
    this.selectedInvoiceS = this.invoicesS[id];

  }

  showPayments(id: any) {
    this.showModalPay = true; // Show-Hide Modal Check
    this.selectedPayment = this.payments[id];

  }

  showEditPerson() {
    this.showModalPerson = true; // Show-Hide Modal Check
  }

  //Bootstrap Modal Close event
  hideModals() {
    this.showModal = false;
    this.showModalS = false;
    this.showModalPay = false;
    this.showModalPerson = false;
  }

  backClicked() {
    this._location.back();
  }
}
