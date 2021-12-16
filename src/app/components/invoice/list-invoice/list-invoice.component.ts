import {Component, OnInit} from '@angular/core';
import {parameters} from '../../../constants/constants';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../../services/token-storage.service';
import {Invoice} from '../../../model/Invoice';
import {InvoiceService} from '../../../services/invoice.service';
import {FileUploadService} from '../../../services/file-upload.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.css']
})
export class ListInvoiceComponent implements OnInit {

  invoice: any;
  message = '';
  query = '';

  invoices: Invoice[] = [];
  currentIndex = -1;
  title = '';
  page = parameters.page;
  count = parameters.count;
  pageSize = parameters.pageSize;
  pageSizes = parameters.pageSizes;
  isEditable = true;

  constructor(private invoiceService: InvoiceService,
              private fileUploadService: FileUploadService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              public tokenStorageService: TokenStorageService,) {
    this.tokenStorageService.getPersonData();
    this.invoices = [];
  }

  ngOnInit(): void {
    this.retrieveInvoices();
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

  retrieveInvoices() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.invoiceService.getAll(params)
      .subscribe(
        response => {
          const {invoices, totalItems} = response;
          this.invoices = invoices;
          this.count = totalItems;
          this.getInvoiceFileInfo();
        },
        error => {
          console.log(error);
          this.authService.logout(error.error.error);
        });
  }

  getInvoiceFileInfo(): void {
    for (let item in this.invoices) {
      if (this.invoices[item].status?.name == 'STATUS_CLOSED') {
        this.isEditable = false;
      }
      if (this.invoices[item].invoiceFileId) {
        this.invoiceService.getFilesById(this.invoices[item].invoiceFileId)
          .subscribe(
            response => {
              const {invoiceFile, fileInfo} = response;
              this.invoices[item].invoiceFile = invoiceFile;
              this.invoices[item].fileInfo = fileInfo[0];
            },
            error => {
              console.log(error);
            });
      }
      // this.invoices.push(invoices[item]);
    }

  }

  deleteInvoice(id: Number | undefined) {
    this.invoiceService.deleteInvoice(id)
      .subscribe(
        response => {
          this.retrieveInvoices();
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveInvoices();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveInvoices();
  }

}
