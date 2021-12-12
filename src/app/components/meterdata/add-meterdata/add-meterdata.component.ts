import { Component, OnInit } from '@angular/core';
import {MeterService} from "../../../services/meter.service";
import {MeterData} from "../../../model/MeterData";
import {MeterdataService} from "../../../services/meterdata.service";
import {Meter} from "../../../model/Meter";
import {Status} from "../../../model/Status";
import {TokenStorageService} from "../../../services/token-storage.service";
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-meterdata',
  templateUrl: './add-meterdata.component.html',
  styleUrls: ['./add-meterdata.component.css']
})
export class AddMeterdataComponent implements OnInit {

  form: MeterData = {
    meterdataid: undefined,
    currentValue: undefined,
    previousValue:undefined,
    meter: undefined,
    status:undefined,
  };
  isSuccessful = false;
  difference=false;
  submitted = false;
  meters: Meter[] = [];
  selectedMeter: any;
  status:Status[] = [];
  selectedStatus:any;

  constructor(private meterdataService: MeterdataService,
              private meterService: MeterService,
              private _location: Location,
              private router:Router,
              public tokenStorageService:TokenStorageService,)
  {
    this.tokenStorageService.getPersonData();
    this.form.previousValue=0;
  }

  ngOnInit(): void {
    this.getAllMeters();
    this.getAllStatus();
  }

  private getAllMeters(): void {
    this.meterdataService.getMeters()
      .subscribe(
        response => {
          this.meters=[];
          // this.meters=response;
          for (let item in response) {
            response[item].bindName = response[item].serial;
            this.meters.push(response[item]);

          }
          console.log("Meters ",this.meters)
        },
        error => {
          console.log(error);
        });
    // return response;
  }

  private getAllStatus(): void {
    this.meterdataService.getStatus()
      .subscribe(
        response => {
          this.status=[];
          this.status = response;
        },
        error => {
          console.log(error);
        });
    // return response;
  }

  saveMeterData(): void {
    for (let status of this.status){
      if(status.name=="STATUS_NEW"){
        this.form.status=status;
      }
    }
    const data = {
      previousValue: this.form.previousValue,
      currentValue: this.form.currentValue,
      meter: this.selectedMeter,
      status: this.form.status,

    };
    console.log("MeterDataCR",data);
    this.meterdataService.createMeterData(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newMeterData(): void {
    this.submitted = false;

    this.form = {
      meterdataid: undefined,
      currentValue: undefined,
      previousValue: undefined,
      meter: undefined,
      status:undefined,
    };
  }

  getPreviousValue() {

    const meterid = this.selectedMeter.meterId;
    console.log("Meter",this.selectedMeter.meterId);
    this.meterdataService.getPreviuosMeterData(meterid)
      .subscribe(
        (response:number) => {
          if(response==null){
            this.form.previousValue=this.selectedMeter.initialValue;
          }else {
            this.form.previousValue=response;
          }
        },
        error => {
          console.log(error);
        });
  }

  enterCurrentValue(event: any) {
    if(event.target.value<=this.form!.previousValue){
      this.difference=true;
    }

  }
  backClicked() {
    this._location.back();
  }
}
