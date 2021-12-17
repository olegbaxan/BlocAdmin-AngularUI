import {Component, OnInit} from '@angular/core';
import {Invoice} from '../../../model/Invoice';
import {InvoiceService} from '../../../services/invoice.service';
import {Observable} from 'rxjs';
import {FileUploadService} from '../../../services/file-upload.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Supplier} from '../../../model/Supplier';
import {Meter} from '../../../model/Meter';
import {TypeOfMeterInvoice} from '../../../model/TypeOfMeterInvoice';
import {Building} from '../../../model/Building';
import {TokenStorageService} from '../../../services/token-storage.service';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {MeterdataService} from '../../../services/meterdata.service';


@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {

  form: Invoice = {
    invoiceId: undefined,
    invoiceNumber: undefined,
    meterDataCurrent: undefined,
    meterDataPrevious: undefined,
    invoiceSum: undefined,
    unitPrice: undefined,
    payTill: undefined,
    emittedDate: undefined,
    dateOfPay: undefined,
    typeOfMeterInvoice: undefined,
    status: undefined,
    supplier: undefined,
    meter: undefined,
    buildings: undefined,
    invoiceFileId: undefined,
    hasMeter: true,
  };

  isSuccessful = false;
  suppliers: Array<Supplier> = [];
  buildings: Array<Building> = [];
  meters: Array<Meter> = [];
  buildMeters: Array<Meter> = [];
  typeOfMeterInvoices: Array<TypeOfMeterInvoice> = [];
  hasMeter: boolean = true;

  //File upload
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  fileId: string = '';
  fileExist: boolean = false;
  fileIdName: string = '';

  previews: string[] = [];
  imageInfos?: Observable<any>;
  invoiceExist = false;


  constructor(private invoiceService: InvoiceService,
              private uploadService: FileUploadService,
              public tokenStorageService: TokenStorageService,
              private _location: Location,
              private meterdataService: MeterdataService,
              private router: Router) {
    this.tokenStorageService.getPersonData();
  }

  ngOnInit(): void {
    this.getAllMeters();
    this.getAllSuppliers();
    this.getAllBuildings();
    this.getAllTypeOfMeterAndInvoice();

  }


  private getAllMeters(): void {
    this.invoiceService.getMeters()
      .subscribe(
        response => {
          this.meters = [];
          for (let item in response) {
            response[item].bindName = response[item].serial;
            this.meters.push(response[item]);

          }
        },
        error => {
          console.log(error);
        });
  }

  private getAllSuppliers(): void {
    this.invoiceService.getSuppliers()
      .subscribe(
        response => {
          this.suppliers = [];
          for (let item in response) {
            response[item].bindName = response[item].supplierName;
            this.suppliers.push(response[item]);
          }
        },
        error => {
          console.log(error);
        });
  }

  private getAllBuildings(): void {
    this.invoiceService.getBuildings()
      .subscribe(
        response => {
          this.buildings = [];
          for (let item in response) {
            if (!response[item].address.entranceNo) {
              response[item].bindName = response[item].address.city + ' ' + response[item].address.raion + ' ' + response[item].address.street + ' ' + response[item].address.houseNumber;
            } else {
              response[item].bindName = response[item].address.city + ' ' + response[item].address.raion + ' ' + response[item].address.street + ' ' + response[item].address.houseNumber + '/' + response[item].address.entranceNo;
            }
            this.buildings.push(response[item]);
          }
        },
        error => {
          console.log(error);
        });
    // return response;
  }

  private getAllTypeOfMeterAndInvoice(): void {
    this.invoiceService.getTypeOfMeterAndInvoice()
      .subscribe(
        response => {
          this.typeOfMeterInvoices = [];
          this.typeOfMeterInvoices = response;
        },
        error => {
          console.log(error);
        });
    // return response;
  }

  getAllBuildingMeters(buildings: Building[] | undefined) {
    if (buildings != null) {
      for (let i = 0; i < buildings?.length; i++) {
        this.buildMeters = [];
        this.getBuildMeters(buildings[i]);
      }
    }

  }

  private getBuildMeters(building: Building): any {
    this.invoiceService.getMetersByBuildingId(building.buildingid)
      .subscribe(
        response => {

          for (let item in response) {
            response[item].bindName = response[item].serial;
            this.buildMeters.push(response[item]);
          }
        },
        error => {
          console.log(error);
        });
    // return response;
  }


  saveInvoice(): void {
    if (!this.form.buildings) {
      // @ts-ignore
      this.form.buildings.push(this.form?.meter?.building);
    }
    const data = {
      invoiceNumber: this.form.invoiceNumber,
      meterDataCurrent: this.form.meterDataCurrent,
      meterDataPrevious: this.form.meterDataPrevious,
      invoiceSum: this.form.invoiceSum,
      unitPrice: this.form.unitPrice,
      payTill: this.form.payTill,
      emittedDate: this.form.emittedDate,
      dateOfPay: this.form.dateOfPay,
      typeOfMeterInvoice: this.form.typeOfMeterInvoice,
      supplier: this.form.supplier,
      buildings: this.form.buildings,
      meter: this.form.meter,
      invoiceFileId: this.fileId,
    };
    this.invoiceService.createInvoice(data)
      .subscribe(
        response => {
          console.log(response);
          this.isSuccessful = true;
          this.router.navigate(['/invoices']);
        },
        error => {
          console.log(error);
        });
  }

  getPreviousValue(meter: Meter | undefined) {

    this.form.typeOfMeterInvoice = undefined;
    this.meterdataService.getPreviuosMeterData(meter?.meterId)
      .subscribe(
        response => {
          if (response == null) {
            this.form.meterDataPrevious = meter?.initialValue;
          } else {
            this.form.meterDataPrevious = response;
          }
        },
        error => {
          console.log(error);
        });
  }

  // tslint:disable-next-line:typedef
  getCurrentPreviousValue(meter: Meter | undefined) {
    if (this.form.typeOfMeterInvoice?.name === 'TYPE_BUILDING' || this.form.typeOfMeterInvoice?.name === 'TYPE_LADDER'){
      this.invoiceService.getMaxCurrentPreviousMeterData(meter?.meterId)
        .subscribe(
          response => {
            if (response == null) {
              this.form.meterDataPrevious = meter?.initialValue;
            } else {
              this.form.meterDataPrevious = response;
            }
          },
          error => {
            console.log(error);
          });
    }
    else {
      this.getPreviousValue(meter);
    }
  }

  //File upload and view methods
  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = {value: 0, fileName: file.name};

    if (file) {
      this.uploadService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            if (event.body.fileDB != 'Unknown') {

              this.fileId = event.body.fileDB[0].name;

              // this.imageInfos = this.uploadService.getFilesById(this.fileId);
              this.imageInfos = event.body.fileDB[0];

            }
            // const msg = 'Uploaded the file successfully: ' + file.name;
            const msg = event.body.message;
            this.message.push(msg);

          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        });
    }

  }

  changeMeter() {
    this.form.buildings = [];
    this.form.meter = undefined;
    this.form.meterDataCurrent = undefined;
  }

  backClicked() {
    this._location.back();
  }


  checkInvoiceNo(invoiceNumber: String | undefined) {
    if (invoiceNumber) {
      this.invoiceService.checkInvoice(invoiceNumber)
        .subscribe(
          response => {
            this.invoiceExist = response;
          },
          error => {
            console.log(error);
          });
    }
  }
}
