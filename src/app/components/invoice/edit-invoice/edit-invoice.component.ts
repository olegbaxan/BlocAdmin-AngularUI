import {Component, OnInit} from '@angular/core';
import {MeterService} from "../../../services/meter.service";
import {SupplierService} from "../../../services/supplier.service";
import {ActivatedRoute, Router} from "@angular/router";
import {InvoiceService} from "../../../services/invoice.service";
import {Supplier} from "../../../model/Supplier";
import {Meter} from "../../../model/Meter";
import {TypeOfMeterInvoice} from "../../../model/TypeOfMeterInvoice";
import {Building} from "../../../model/Building";
import {TokenStorageService} from "../../../services/token-storage.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {FileUploadService} from "../../../services/file-upload.service";
import {Location} from "@angular/common";


@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css']
})
export class EditInvoiceComponent implements OnInit {

  title = "Edit meter form";
  invoice: any;
  meters: Meter[] = [];
  suppliers: Supplier[] = [];
  buildings: Building[] = [];
  selectedMeter: Meter | undefined;
  selectedSupplier: Supplier | undefined;//undefined
  typeOfMeterInvoice: TypeOfMeterInvoice[] = [];
  selectedTypeOfMeterInvoice: TypeOfMeterInvoice | undefined;
  selectedBuildings: Building | undefined;
  hasMeter: boolean = true;

  //File upload
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  fileId:string='';
  isSuccessful = false;

  previews: string[] = [];
  imageInfos?: Observable<any>;

  constructor(private meterService: MeterService,
              private invoiceService: InvoiceService,
              private supplierService: SupplierService,
              private uploadService: FileUploadService,
              private route: ActivatedRoute,
              private router: Router,
              public tokenStorageService:TokenStorageService,
              private _location: Location,)
  {
    this.tokenStorageService.getPersonData();
  }

  ngOnInit(): void {

    this.getInvoiceById(this.route.snapshot.paramMap.get('id'));
    this.getAllMeters();
    this.getAllBuildings();
    this.getAllSuppliers();
    this.getAllTypeOfMeterAndInvoice()
  }

  private getAllMeters(): void {
    this.invoiceService.getMeters()
      .subscribe(
        response => {
          this.meters=[];
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
          this.suppliers=[];
          for (let item in response) {
            response[item].bindName = response[item].supplierName;
            this.suppliers.push(response[item]);

          }
        },
        error => {
          console.log(error);
        });
    // return response;
  }

  private getAllBuildings(): void {
    this.invoiceService.getBuildings()
      .subscribe(
        response => {
          this.buildings=[];
          for (let item in response) {
            if (!response[item].address.entranceNo) {
              response[item].bindName = response[item].address.city + " " + response[item].address.raion + " " + response[item].address.street + " " + response[item].address.houseNumber;
            } else {
              response[item].bindName = response[item].address.city + " " + response[item].address.raion + " " + response[item].address.street + " " + response[item].address.houseNumber + "/" + response[item].address.entranceNo;
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
          this.typeOfMeterInvoice=[];
          this.typeOfMeterInvoice = response;
        },
        error => {
          console.log(error);
        });
  }

  private getInvoiceById(id: string | number | null): void {
    this.invoiceService.getById(id)
      .subscribe(
        data => {
          this.invoice = data;
          if (data.buildings) {

            for (let i in data.buildings) {
              if (!data.buildings[i].address.entranceNo) {
                data.buildings[i].bindName = data.buildings[i].address.city + " " + data.buildings[i].address.raion + " " + data.buildings[i].address.street + " " + data.buildings[i].address.houseNumber;
              }else{
                data.buildings[i].bindName = data.buildings[i].address.city + " " + data.buildings[i].address.raion+ " " + data.buildings[i].address.street+ " " + data.buildings[i].address.houseNumber+"/"+data.buildings[i].address.entranceNo;
              }

            }
          }
          data.supplier.bindName=data.supplier.supplierName;
          if(data.typeOfMeterInvoice){
            data.typeOfMeterInvoice.bindName=data.typeOfMeterInvoice.name
          }
          if(data.meter){
            data.meter.bindName=data.meter.serial;
          }

          this.selectedSupplier = data.supplier;
          this.selectedMeter = data.meter;
          this.selectedBuildings = data.buildings;
          this.selectedTypeOfMeterInvoice = data.typeOfMeterInvoice;
          if (data.meter) {
            this.hasMeter = true
          } else {
            this.hasMeter = false;
          }
        },
        error => {
          console.log(error);
        });
  }

  updateInvoice(playlistForm: { reset: () => void; }): void {
    this.invoiceService.editInvoice(this.invoice.invoiceId, this.invoice)
      .subscribe(
        response => {
          // this.message = 'The meter was updated successfully!';
        },
        error => {
          console.log(error);
        });
    setTimeout(() => {
      playlistForm.reset();
      this.router.navigate(['/invoices']);
    }, 1000);
  }

  updatePublished(status: any): void {
    const data = {
      title: this.invoice.title,
      description: this.invoice.invoiceId,
      published: status
    };

    this.invoiceService.editInvoice(this.invoice.id, data)
      .subscribe(
        response => {
          this.invoice.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  setTypeOfMeterInvoice($event: Event) {
    console.log("Event",$event);
    // console.log("selectedType",selectedTypeOfMeterInvoice);
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
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this.uploadService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            if(event.body.fileDB!="Unknown"){

              this.fileId=event.body.fileDB[0].name;
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
  backClicked() {
    this._location.back();
  }

}
