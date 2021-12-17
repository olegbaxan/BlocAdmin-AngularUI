import {Component, OnInit} from '@angular/core';
import {MeterData} from '../../../model/MeterData';
import {Supplier} from '../../../model/Supplier';
import {parameters} from '../../../constants/constants';
import {TypeOfMeterInvoice} from '../../../model/TypeOfMeterInvoice';
import {MeterdataService} from '../../../services/meterdata.service';
import {MeterService} from '../../../services/meter.service';
import {SupplierService} from '../../../services/supplier.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../../services/token-storage.service';
import {Observable} from 'rxjs';
import {Building} from '../../../model/Building';
import {Flat} from '../../../model/Flat';
import {BuildingService} from '../../../services/building.service';
import {FlatService} from '../../../services/flat.service';
import {Invoice} from '../../../model/Invoice';
import {Meter} from '../../../model/Meter';
import {Location} from '@angular/common';
import {Status} from '../../../model/Status';
import {InvoiceService} from '../../../services/invoice.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-bulkadd-meterdata',
  templateUrl: './bulkadd-meterdata.component.html',
  styleUrls: ['./bulkadd-meterdata.component.css']
})
export class BulkaddMeterdataComponent implements OnInit {

  meterdata: any;
  submitted = false;
  message = '';
  query = '';

  metersdata: MeterData[];
  prevValue: any;
  suppliers: Supplier[] = [];
  selectedSupplier: Supplier | undefined;
  buildings: Building[] = [];
  selectedBuilding: Building[] | undefined;
  invoices: Invoice[] = [];
  selectedInvoice: Invoice | undefined;
  status: Status[] = [];
  flats: Flat[] = [];
  hasEntrances = false;
  selectedEntrance: any;
  entrances: any = [];
  meters: Meter[] = [];


  currentIndex = -1;
  supp: String | undefined = '';
  ladd = 0;
  build: Number | undefined = 0;

  page = parameters.page;
  count = parameters.count;
  pageSize = parameters.pageSize;
  pageSizes = parameters.pageSizes;

  typeOfMeterAndInvoice: TypeOfMeterInvoice[] = [];
  selectedTypeOfMeterAndInvoice: any = '';

  total = 0;
  private value: any;

  constructor(private meterdataService: MeterdataService,
              private meterService: MeterService,
              private buildingService: BuildingService,
              private flatService: FlatService,
              private supplierService: SupplierService,
              private invoiceService: InvoiceService,
              private route: ActivatedRoute,
              private router: Router,
              private _location: Location,
              public tokenStorageService: TokenStorageService,
              public datepipe: DatePipe) {
    this.tokenStorageService.getPersonData();
    this.metersdata = [];
  }

  ngOnInit(): void {
    this.getAllSuppliers();
    this.getAllBuildings();
    this.getAllStatus();
  }

  updateMeterData(id: any, currentValue: any) {
    this.meterdata.currentValue = currentValue;
    this.meterdataService.editMeterData(id, this.meterdata)
      .subscribe(
        response => {
          this.message = 'The meterdata was updated successfully!';
        },
        error => {
          console.log(error);
        });

  }

  getMeterDataById(id: number): Observable<any> {
    return this.meterdataService.getById(id);

  }

  getRequestParams(supplier: String | undefined, entrance: number, building: Number | undefined): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};

    if (supplier) {
      params[`supp`] = supplier;
    }
    if (entrance) {
      params[`ladd`] = entrance;
    }
    if (building) {
      params[`build`] = building;
    }

    return params;
  }


  private getAllTypeOfMeterAndInvoice(): void {
    this.meterService.getTypeOfMeterInvoice()
      .subscribe(
        response => {
          this.typeOfMeterAndInvoice = [];
          this.typeOfMeterAndInvoice = response;
        },
        error => {
          console.log(error);
        });
  }

  getAllSuppliers(): void {
    this.meterService.getSuppliers()
      .subscribe(
        response => {
          this.suppliers = [];
          for (let item in response) {
            response[item].bindName = response[item].supplierName;
            this.suppliers.push(response[item])
          }
        },
        error => {
          console.log(error);
        });
  }

  getAllInvoices(): void {
    // @ts-ignore
    this.meterdataService.getInvoices(this.selectedSupplier.supplierName)
      .subscribe(
        response => {
          this.invoices = [];
          for (let item in response) {
            response[item].bindName = response[item].invoiceNumber;
            response[item].countData = response[item].meterDataCurrent - response[item].meterDataPrevious;

            this.invoices.push(response[item]);

          }
        },
        error => {
          console.log(error);
        });
    // return response;
  }

  getAllBuildings(): void {
    this.flatService.getBuildings()
      .subscribe(
        response => {
          this.buildings = [];
          for (let item in response) {
            response[item].bindName = response[item].address.city;

            this.buildings.push(response[item]);

          }
        },
        error => {
          console.log(error);
        });
    // return response;
  }

  getFilteredMeters(buildings: Building[] | undefined) {
    if (buildings != null) {
      for (let i = 0; i < buildings?.length; i++) {
        this.meters = [];
        this.retrieveMeters(buildings[i]);
      }
    }
  }

  retrieveMeters(building: Building) {
    this.supp = this.selectedSupplier?.supplierName;
    this.ladd = this.selectedEntrance;
    this.build = building.buildingid;
    const params = this.getRequestParams(this.supp, this.ladd, this.build);
    this.metersdata = [];
    this.meterService.getFilteredMeters(params)
      .subscribe(
        response => {
          this.meters = response;
          console.log("Meters from search",response);
          this.getPreviousValue();
        },
        error => {
          console.log(error);
        });
  }

  getPreviousValue() {
    this.meters?.forEach((meter) => {
      this.meterdataService.getPreviuosMeterData(meter.meterId)
        .subscribe(
          response => {
            if (response == null) {
              this.prevValue = meter.initialValue;
            } else {
              this.prevValue = response;
            }
            this.initMeterData(meter);
          },
          error => {
            console.log(error);
          });
    });
  }

  initMeterData(meter: any) {
    const meterdata = new MeterData();
    meterdata.meter = meter;
    meterdata.previousValue = this.prevValue;
    meterdata.currentValue = 0;
    meterdata.status = this.status[0];

    this.metersdata.push(meterdata);

  }

  changeStatusSelectedInvoice(invoice: any): void {
    this.invoiceService.editInvoice(invoice.invoiceId, invoice)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;

        },
        error => {
          console.log(error);
        });
  }

  saveMeterData(): void {
    if (this.selectedInvoice) {
      for (let i = 0; i < this.metersdata.length; i++) {
        this.metersdata[i].status = this.status[2];
      }
    }
    this.meterdataService.createBulkMeterData(this.metersdata)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.router.navigate(['/meterdata']);
        },
        error => {
          console.log(error);
        });
    if (this.selectedInvoice) {

      this.initInvoiceData(this.metersdata);

      this.selectedInvoice.status = this.status[3];
      this.changeStatusSelectedInvoice(this.selectedInvoice);
    }
  }

  initInvoiceData(metersdata: any) {
    this.metersdata.forEach((meterdata) => {
      if ((meterdata.currentValue - meterdata.previousValue) > 0) {

        const invoice = new Invoice();
        invoice.invoiceNumber = this.selectedInvoice?.invoiceNumber + '/' + this.datepipe.transform(Date.now(), 'YYYY/MM/dd/HH:MM:SS'
          + '/' + meterdata.meter?.flat?.flatNumber + '/' + meterdata.meter?.flat?.flatid);
        invoice.meterDataCurrent = meterdata.currentValue;
        invoice.meterDataPrevious = meterdata.previousValue;
        // @ts-ignore
        invoice.invoiceSum = ((meterdata.currentValue - meterdata.previousValue) * this.selectedInvoice?.unitPrice).toFixed(2);
        invoice.unitPrice = this.selectedInvoice?.unitPrice;
        if (invoice.payTill) {
          invoice.payTill = this.selectedInvoice?.payTill;
        } else {
          invoice.payTill = new Date();
        }
        if (invoice.emittedDate) {
          invoice.emittedDate = this.selectedInvoice?.emittedDate;
        } else {
          invoice.emittedDate = new Date();
        }
        invoice.invoiceFileId = '';
        invoice.supplier = meterdata?.meter?.supplier;
        invoice.meter = meterdata.meter;
        invoice.typeOfMeterInvoice = meterdata?.meter?.typeOfMeterInvoice;
        //

        this.invoices.push(invoice);
        this.invoiceService.createInvoice(invoice)
          .subscribe(
            response => {
              console.log(response);
            },
            error => {
              console.log(error);
            });
      }
    });
  }


  findsum() {
    this.total = 0;
    for (let i in this.metersdata) {
      if (this.metersdata[i].meterValue) {
        // @ts-ignore
        this.total += this.metersdata[i].meterValue;
      }

    }

    console.log('Total', this.total);
  }

  onChangeEvent(event: any, id: any) {
    this.metersdata[id].meterValue = event.target.value - this.metersdata[id].previousValue;
    this.findsum();
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
  }

  resetValues() {
    this.selectedBuilding = [];
    this.selectedSupplier = undefined;
    this.hasEntrances = false;
    this.selectedInvoice = new Invoice();
  }

  backClicked() {
    this._location.back();
  }
}
