import { Component, OnInit } from '@angular/core';
import {InvoiceService} from "../../../services/invoice.service";
import {Invoice} from "../../../model/Invoice";
import {FlatService} from "../../../services/flat.service";
import {Flat} from "../../../model/Flat";
import {TokenStorageService} from '../../../services/token-storage.service';

@Component({
  selector: 'app-board-blocadmin',
  templateUrl: './board-blocadmin.component.html',
  styleUrls: ['./board-blocadmin.component.css']
})
export class BoardBlocadminComponent implements OnInit {

  newInvoices: Invoice[]=[];
  newInvoicesSupp: Invoice[]=[];
  flats:Flat[]=[];
  constructor(private invoiceService: InvoiceService,
              private flatService: FlatService,
              public tokenStorageService: TokenStorageService)
  {
    this.tokenStorageService.getPersonData();
  }

  ngOnInit(): void {
    this.getFlatsNegativeWallet();
    this.getPersonInvoices();
    this.getSupplierInvoices();
  }


  //get flats with negative wallet
  private getFlatsNegativeWallet() {
    this.flatService.getAllNegativeWallet()
      .subscribe(
        data => {
          this.flats = data;
          console.log("Flat NegWallet",this.flats);
        },
        error => {
          console.log(error);
        });
  }
  //get invoices with new and sendinvoice status
  private getPersonInvoices() {
    this.invoiceService.getNewInvoicesPerson()
      .subscribe(
        data => {
          this.newInvoices = data;
          console.log("Invoices Person",this.newInvoices);
        },
        error => {
          console.log(error);
        });
  }
  //get unpaid supplier invoices
  private getSupplierInvoices() {
    this.invoiceService.getNewInvoicesSuppliers()
      .subscribe(
        data => {
          this.newInvoicesSupp = data;
          console.log("Invoices SupplierData",this.newInvoicesSupp);
        },
        error => {
          console.log(error);
        });
  }

}
