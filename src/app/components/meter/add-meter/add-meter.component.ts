import {Component, OnInit} from '@angular/core';

import {FlatService} from "../../../services/flat.service";
import {PersonService} from "../../../services/person.service";
import {MeterService} from "../../../services/meter.service";
import {Meter} from "../../../model/Meter";
import {SupplierService} from "../../../services/supplier.service";
import {Building} from "../../../model/Building";
import {TypeOfMeterInvoice} from "../../../model/TypeOfMeterInvoice";
import {MeterDest} from "../../../model/MeterDest";
import {Flat} from "../../../model/Flat";
import {Person} from "../../../model/Person";
import {Supplier} from "../../../model/Supplier";
import {TokenStorageService} from "../../../services/token-storage.service";
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-meter',
  templateUrl: './add-meter.component.html',
  styleUrls: ['./add-meter.component.css']
})
export class AddMeterComponent implements OnInit {

  form: Meter = {
    meterId: undefined,
    meterDest: new MeterDest(),
    serial: undefined,
    initialValue: undefined,
    typeOfMeterInvoice:new TypeOfMeterInvoice(),
    person: new Person(),
    supplier: new Supplier(),
    flat: new Flat(),
    building:new Building(),
  };

  isSuccessful = false;
  persons: any = [];
  flats: any = [];
  suppliers: any = [];
  selectedPerson: Person|undefined ;
  selectedSuppliers: Supplier |undefined;
  selectedFlats: Flat|undefined;
  meterType: any = [];
  selectedMeterDest=new MeterDest();
  typeOfMeterInvoice: any = [];
  selectedTypeOfMeterInvoice: TypeOfMeterInvoice|undefined;
  buildings:Building[] = [];
  selectedBuilding:Building|undefined;
  serialExist = false;

  constructor(private meterService: MeterService,
              private flatService: FlatService,
              private personService: PersonService,
              private supplierService: SupplierService,
              private _location: Location,
              public tokenStorageService:TokenStorageService,
              private router:Router)
  {
    this.tokenStorageService.getPersonData();
  }

  ngOnInit(): void {
    this.getAllPersons();
    this.getAllSuppliers();
    this.getAllMeterType();
    this.getAllBuildings();
    this.getAllTypeOfMeterInvoice()
  }

  private getAllPersons(): void {
    this.meterService.getPersons()
      .subscribe(
        response => {
          this.persons=[];
          for (let item in response) {
            console.log("response roles ",response[item].roles)
            for (var i in response[item].roles) {
              if (response[item].roles[i].name === "ROLE_USER") {
                response[item].bindName = response[item].name + " " + response[item].surname;
                this.persons.push(response[item]);

              }
            }
          }
          console.log("Person",this.persons)
        },
        error => {
          console.log(error);
        });
    // return response;
  }

  private getAllFlats(): void {
    this.meterService.getFlats()
      .subscribe(
        response => {
          this.flats=[];
          for (let item in response) {
            // response[item].bindName = response[item].flatNumber+" "+response[item].floor;
            response[item].bindName = response[item].flatNumber;
            this.flats.push(response[item]);

          }
          console.log("FLats ", this.flats);
          console.log("FLatsNumber ", this.flats.flatNumber);
        },
        error => {
          console.log(error);
        });
    // return response;
  }
  getFlatsByBuildingid(): void {
    this.flats=[];
    this.selectedFlats=undefined;
    this.form.typeOfMeterInvoice=undefined;
    console.log("BuildingFlat",this.selectedBuilding?.buildingid)
    this.meterService.getBuildingFlats(this.selectedBuilding?.buildingid)
      .subscribe(
        response => {
          this.flats=[];
          for (let item in response) {
            response[item].bindName = response[item].flatNumber;
            this.flats.push(response[item]);
            console.log("FLats ", this.flats);
            console.log("FLatsNumber ", response[item].flatNumber);
          }

        },
        error => {
          console.log(error);
        });
    // return response;
  }

  private getAllSuppliers(): void {
    this.meterService.getSuppliers()
      .subscribe(
        response => {
          this.suppliers=[];
          for (let item in response) {
            response[item].bindName = response[item].supplierName;

            this.suppliers.push(response[item]);

          }
          console.log("this.suppliers ", this.suppliers);
        },
        error => {
          console.log(error);
        });
    // return response;
  }

  private getAllMeterType(): void {
    this.meterService.getMeterType()
      .subscribe(
        response => {
          this.meterType=[];
          this.meterType = response;
        },
        error => {
          console.log(error);
        });
    // return response;
  }

  private getAllTypeOfMeterInvoice(): void {
    this.meterService.getTypeOfMeterInvoice()
      .subscribe(
        response => {
          this.typeOfMeterInvoice=[];
          for (let i in response){
            console.log("responce type",response[i].name);
            //to exclude posibility to add meters to person
            if(!response[i].name.localeCompare("TYPE_PERSON")){
              this.typeOfMeterInvoice.push(response[i]);
            }
          }
          this.typeOfMeterInvoice=response;
          console.log("Type",this.typeOfMeterInvoice);

        },
        error => {
          console.log(error);
        });
    // return response;
  }
  private getAllBuildings(): void {
    this.meterService.getBuildings()
      .subscribe(
        response => {
          this.buildings=[];
          for (let item in response) {
            if(!response[item].address.entranceNo){
              response[item].bindName = response[item].address.city + " " + response[item].address.raion+ " " + response[item].address.street+ " " + response[item].address.houseNumber;
            }
            else {
              response[item].bindName = response[item].address.city + " " + response[item].address.raion+ " " + response[item].address.street+ " " + response[item].address.houseNumber+"/"+response[item].address.entranceNo;
            }
            this.buildings.push(response[item]);

          }
          console.log("this.buildings ",this.buildings );
        },
        error => {
          console.log(error);
        });
  }

  saveMeter(): void {
    const data = {
      serial: this.form.serial,
      meterDest: this.selectedMeterDest,
      initialValue: this.form.initialValue,
      typeOfMeterInvoice: this.selectedTypeOfMeterInvoice,
      person: this.selectedPerson,
      supplier: this.selectedSuppliers,
      flat: this.selectedFlats,
      building: this.selectedBuilding,
    };
    console.log("MeterData ", data);
    this.meterService.createMeter(data)
      .subscribe(
        response => {
          console.log(response);
          this.isSuccessful = true;
          this.router.navigate(['/meters']);
        },
        error => {
          console.log(error);
        });
  }
  checkSerial(serial: String | undefined): void {
    console.log("Serial",serial)
    if (serial)  {
      this.meterService.checkSerial(serial)
        .subscribe(
          response => {
            this.serialExist = response;
            console.log("Serial responce ", response)
          },
          error => {
            console.log(error);
          });
    }
  }

  // newMeter(): void {
  //   this.isSuccessful = false;
  //
  //   this.meter = {
  //     meterId: undefined,
  //     meterDest: undefined,
  //     serial: undefined,
  //     initialValue: undefined,
  //     typeOfMeterInvoice: undefined,
  //     person: undefined,
  //     supplier: undefined,
  //     flat: undefined,
  //     building:undefined,
  //   };
  // }

  setTypeOfMeterInvoice() {
    this.selectedFlats=undefined;
    this.selectedPerson=undefined;

  }
  backClicked() {
    this._location.back();
  }

  selectTypeOfMeterInvoice($event:TypeOfMeterInvoice) {
    this.selectedTypeOfMeterInvoice=$event;
  }
}
