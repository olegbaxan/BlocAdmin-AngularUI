import {Component, OnInit} from '@angular/core';
import {FlatService} from "../../../services/flat.service";
import {PersonService} from "../../../services/person.service";
import {BuildingService} from "../../../services/building.service";
import {MeterService} from "../../../services/meter.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SupplierService} from "../../../services/supplier.service";
import {Person} from "../../../model/Person";
import {Flat} from "../../../model/Flat";
import {Supplier} from "../../../model/Supplier";
import {MeterDest} from "../../../model/MeterDest";
import {TypeOfMeterInvoice} from "../../../model/TypeOfMeterInvoice";
import {Building} from "../../../model/Building";
import {TokenStorageService} from "../../../services/token-storage.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-edit-meter',
  templateUrl: './edit-meter.component.html',
  styleUrls: ['./edit-meter.component.css']
})
export class EditMeterComponent implements OnInit {

  title = "Edit meter form";
  meter: any;
  message = '';
  persons: Person[] = [];
  flats: Flat[] = [];
  suppliers: Supplier[] = [];
  selectedPerson = new Person();
  selectedSuppliers = new Supplier();
  selectedFlats: Flat = new Flat();
  meterDest: MeterDest[] = [];
  selectedMeterDest = new MeterDest();
  typeOfMeterInvoice: TypeOfMeterInvoice[] = [];
  selectedTypeOfMeterInvoice = new TypeOfMeterInvoice();
  buildings: Building[] = [];
  selectedBuilding = new Building();
  isSuccessful = false;
  serialExist = false;

  constructor(private meterService: MeterService,
              private flatService: FlatService,
              private personService: PersonService,
              private supplierService: SupplierService,
              private buildingService: BuildingService,
              private route: ActivatedRoute,
              private router: Router,
              public tokenStorageService: TokenStorageService,
              private _location: Location,) {
    this.tokenStorageService.getPersonData();
  }

  ngOnInit(): void {
    this.message = '';

    this.getMeterById(this.route.snapshot.paramMap.get('id'));
    this.getAllPersons();
    this.getAllFlats();
    this.getAllBuildings();
    this.getAllSuppliers();
    this.getAllMeterType();
    this.getAllTypeOfMeterInvoice()
  }

  private getAllPersons(): void {
    this.flatService.getPersons()
      .subscribe(
        response => {
          this.persons = [];
          for (let item in response) {
            response[item].bindName = response[item].name + " " + response[item].surname;
            this.persons.push(response[item]);
            console.log("Persons ", this.persons)
          }
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
          this.flats = [];
          for (let item in response) {
            response[item].bindName = response[item].flatNumber;
            this.flats.push(response[item]);
          }
          console.log("Flats", this.flats);
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
          this.suppliers = [];
          for (let item in response) {
            // response[item].bindName = response[item].supplierName;
            this.suppliers.push(response[item]);
            console.log("this.suppliers ", this.suppliers);
          }
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
          this.meterDest = [];
          this.meterDest = response;
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
          this.typeOfMeterInvoice = [];
          this.typeOfMeterInvoice = response;
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
          this.buildings = [];
          for (let item in response) {
            if (!response[item].address.entranceNo) {
              response[item].bindName = response[item].address.city + " " + response[item].address.raion + " " + response[item].address.street + " " + response[item].address.houseNumber;
            } else {
              response[item].bindName = response[item].address.city + " " + response[item].address.raion + " " + response[item].address.street + " " + response[item].address.houseNumber + "/" + response[item].address.entranceNo;
            }
            this.buildings.push(response[item]);
            console.log("this.buildings ", this.buildings);
          }
        },
        error => {
          console.log(error);
        });
    // return response;
  }

  private getMeterById(id: string | number | null): void {
    this.meterService.getById(id)
      .subscribe(
        data => {
          console.log("DataMeter", data);
          if (data.person) {
            data.person.bindName = data.person.name + " " + data.person.surname;
          }
          if (data.flat) {
            data.flat.bindName = data.flat.flatNumber + " - " + data.flat.floor;
          }
          if (data.supplier) {
            data.supplier.bindName = data.supplier.supplierName;
          }
          if (data.building) {
            if (!data.building.address.entranceNo) {
              data.building.bindName = data.building.address.city + " " + data.building.address.raion + " " + data.building.address.street + " " + data.building.address.houseNumber
            } else {
              data.building.bindName = data.building.address.city + " " + data.building.address.raion + " " + data.building.address.street + " " + data.building.address.houseNumber + "/" + data.building.address.entranceNo

            }
          }

          this.meter = data;
          this.selectedSuppliers = data.supplier;
          this.selectedPerson = data.person;
          this.selectedFlats = data.flat;
          this.selectedBuilding = data.building;
          this.selectedMeterDest = data.meterDest;
          this.selectedTypeOfMeterInvoice = data.typeOfMeterInvoice;
        },
        error => {
          console.log(error);
        });
  }

  updateMeter(playlistForm: { reset: () => void; }): void {
    this.meter.supplier = this.selectedSuppliers;
    this.meter.person = this.selectedPerson;
    this.meter.flat = this.selectedFlats;
    this.meter.building = this.selectedBuilding;
    this.meter.meterDest = this.selectedMeterDest;
    this.meter.typeOfMeterInvoice = this.selectedTypeOfMeterInvoice;
    console.log("DataMeter",this.meter);
    this.meterService.editMeter(this.meter.meterid, this.meter)
      .subscribe(
        response => {
          this.isSuccessful = true
          this.message = 'The meter was updated successfully!';
        },
        error => {
          console.log(error);
        });
    setTimeout(() => {
      playlistForm.reset();
      this.router.navigate(['/meters']);
    }, 1000);
  }

  updatePublished(status: any): void {
    const data = {
      title: this.meter.title,
      description: this.meter.meterid,
      published: status
    };

    this.meterService.editMeter(this.meter.id, data)
      .subscribe(
        response => {
          this.meter.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  backClicked() {
    this._location.back();
  }

  checkSerial(serial: String | undefined): void {
    if ((serial) && (serial?.length > 3)) {
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

}
