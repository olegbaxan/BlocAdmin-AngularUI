import { Component, OnInit } from '@angular/core';
import {MeterData} from "../../../model/MeterData";
import {Supplier} from "../../../model/Supplier";
import {parameters} from "../../../constants/constants";
import {MeterdataService} from "../../../services/meterdata.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../../services/token-storage.service";
import {MeterService} from "../../../services/meter.service";
import {Observable} from "rxjs";
import {SupplierService} from "../../../services/supplier.service";
import {TypeOfMeterInvoice} from "../../../model/TypeOfMeterInvoice";
import {FlatService} from "../../../services/flat.service";
import {Building} from "../../../model/Building";
import {DatePipe, Location} from '@angular/common';
import {Invoice} from "../../../model/Invoice";
import {Flat} from "../../../model/Flat";
import {Meter} from "../../../model/Meter";
import {Status} from "../../../model/Status";
import {InvoiceService} from "../../../services/invoice.service";

@Component({
  selector: 'app-bulk-meterdata',
  templateUrl: './bulk-meterdata.component.html',
  styleUrls: ['./bulk-meterdata.component.css']
})
export class BulkMeterdataComponent implements OnInit {

  meterdata: any;
  oldmeterdata: any;
  message = '';
  query = '';

  metersdata?: MeterData[];
  suppliers: Supplier[] = [];
  selectedSupplier:Supplier|undefined;
  buildings: Building[] = [];
  selectedBuildings:Building[]|undefined;
  invoices: Invoice[] = [];
  selectedInvoice: Invoice|undefined;
  flats: Flat[] = [];
  hasEntrances = false;
  selectedEntrance: any;
  entrances: any = [];
  meters: Meter[] = [];
  status: Status[] = [];

  currentIndex = -1;
  supp:String | undefined;
  build:Number | undefined;
  loggedUserID: string = '';
  loggedUserName: string = '';
  isLoggedIn: boolean = false;
  page = parameters.page;
  count = parameters.count;
  // pageSize = parameters.pageSize;
  pageSize = parameters.pageSize;
  pageSizes = parameters.pageSizes;

  typeOfMeterAndInvoice: TypeOfMeterInvoice[] = [];
  selectedTypeOfMeterAndInvoice: any="";

  total=0;
  private value: any;

  constructor(private meterdataService: MeterdataService,
              private meterService: MeterService,
              private supplierService: SupplierService,
              private flatService: FlatService,
              private invoiceService: InvoiceService,
              private route: ActivatedRoute,
              private router: Router,
              private _location: Location,
              public tokenStorageService:TokenStorageService,
              public datepipe: DatePipe)
  {
    this.tokenStorageService.getPersonData();
    this.metersdata=[];
  }

  ngOnInit(): void {
    // this.retrieveMeterData();
    this.getAllSuppliers();
    this.getAllBuildings();
    this.getAllStatus();
  }
   updateMeterData(id:any,currentValue:any) {
    this.meterdata.currentValue=currentValue;
    this.meterdataService.editMeterData(id, this.meterdata)
      .subscribe(
        response => {
          this.message = 'The meterdata was updated successfully!';
        },
        error => {
          console.log(error);
        });
    setTimeout(()=>{
      this.getFilteredMeters(this.selectedBuildings);
    }, 1000);
  }
  getMeterDataById(id:number):Observable<any> {
    return this.meterdataService.getById(id);

  }
  getRequestParams(supp: String|undefined,build:Number|undefined): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};

    if (supp) {
      params[`supp`] = supp;
    }
    if (build) {
      params[`build`] = build;
    }

    return params;
  }

  getAllSuppliers(): void {
    this.meterService.getSuppliers()
      .subscribe(
        response => {
          this.suppliers=[];
          for (let item in response) {
            response[item].bindName = response[item].supplierName;

            this.suppliers.push(response[item]);
            console.log("this.suppliers ", this.suppliers);
          }
        },
        error => {
          console.log(error);
        });
    // return response;
  }
  getAllInvoices(): void {
    // @ts-ignore
    this.meterdataService.getInvoices(this.selectedSupplier.supplierName)
      .subscribe(
        response => {
          this.invoices=[];
          for (let item in response) {
            response[item].bindName = response[item].invoiceNumber;
            response[item].countData=response[item].meterDataCurrent-response[item].meterDataPrevious;

            this.invoices.push(response[item]);

          }
          console.log("this.invoices ", this.invoices);
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
          this.buildings=[];
          for (let item in response) {
            response[item].bindName = response[item].address.city;

            this.buildings.push(response[item]);

          }
          console.log("this.buildings ", this.buildings);
        },
        error => {
          console.log(error);
        });
    // return response;
  }
  getFilteredMeters(buildings:Building[]|undefined) {
    console.log("Selected Buildings", buildings);
    if (buildings!=null){
      for (let i=0;i<buildings?.length;i++){
        this.metersdata=[];
        this.retrieveMeterData(buildings[i]);
      }
    }
  }
  retrieveMeterData(building:Building) {

    this.supp=this.selectedSupplier?.supplierName;
    this.build=building.buildingid;
    console.log("BuildingID",this.build)
    const params = this.getRequestParams(this.supp,this.build);

    this.meterdataService.getAllNew(params)
      .subscribe(
        response => {
          const {meterData} = response;
          for (let item in meterData){
            this.metersdata?.push(meterData[item]);
            this.findsum(this.metersdata)
          }
          console.log("MeterDataretr",this.metersdata);
        },
        error => {
          console.log(error);
        });
  }
  saveInvoiceData() {
    console.log("Save Invoice Data");
    this.metersdata?.forEach((meterdata) => {
      if ((meterdata.currentValue - meterdata.previousValue) > 0) {

        const invoice = new Invoice();
        invoice.invoiceNumber = this.selectedInvoice?.invoiceNumber + "/" + this.datepipe.transform(Date.now(),"YYYY/MM/dd/HH:MM:SS"
          +"/"+meterdata.meter?.flat?.flatNumber+"/"+meterdata.meter?.flat?.flatid);        invoice.meterDataCurrent = meterdata.currentValue;
        invoice.meterDataPrevious = meterdata.previousValue;
        // @ts-ignore
        invoice.invoiceSum = ((meterdata.currentValue - meterdata.previousValue) * this.selectedInvoice?.unitPrice).toFixed(2);
        invoice.unitPrice = this.selectedInvoice?.unitPrice;
        if (invoice.payTill) {
          invoice.payTill = this.selectedInvoice?.payTill;
        } else invoice.payTill = new Date();
        if (invoice.emittedDate) {
          invoice.emittedDate = this.selectedInvoice?.emittedDate;
        } else invoice.emittedDate = new Date();

        invoice.supplier = meterdata?.meter?.supplier;
        invoice.meter = meterdata.meter;
        invoice.typeOfMeterInvoice = meterdata?.meter?.typeOfMeterInvoice;
        invoice.status = this.status[0];



        this.invoices.push(invoice);
        meterdata.status = this.status[2];
        console.log("meterdata:t", meterdata);
        console.log("invoices:t", invoice);

        this.invoiceService.createInvoice(invoice)
          .subscribe(
            response => {
              console.log(response);
            },
            error => {
              console.log(error);
            });
        this.meterdataService.editMeterData(meterdata.meterdataid, meterdata)
          .subscribe(
            response => {
              console.log(response);
            },
            error => {
              console.log(error);
            });
      }

    })
  }
  private getAllStatus(): void {
    this.meterdataService.getStatus()
      .subscribe(
        response => {
          this.status = response;
          console.log("Status", this.status)
        },
        error => {
          console.log(error);
        });
    // return response;
  }
  findsum(data:any){
    this.total=0;
    this.value=data
    console.log(this.value);
    for(let j=0;j<data.length;j++){
      this.total+= this.value[j].currentValue-this.value[j].previousValue;
    }
    console.log("Total",this.total)
  }

  async onChangeEvent(event: any,id: any){

    this.getMeterDataById(id).subscribe((data) => {
      this.meterdata = data;
      console.log('meterdata', this.meterdata);
      this.updateMeterData(id,event.target.value);

    });

  }

  resetValues() {
    this.selectedBuildings = undefined;
    this.selectedSupplier = undefined;
    this.metersdata=[];
  }
  backClicked() {
    this._location.back();
  }

}
