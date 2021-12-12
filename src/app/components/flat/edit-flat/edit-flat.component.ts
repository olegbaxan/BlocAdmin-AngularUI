import { Component, OnInit } from '@angular/core';
import {BuildingService} from "../../../services/building.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FlatService} from "../../../services/flat.service";
import {PersonService} from "../../../services/person.service";
import {MeterService} from "../../../services/meter.service";
import {Person} from "../../../model/Person";
import {Meter} from "../../../model/Meter";
import {Building} from "../../../model/Building";
import {TokenStorageService} from "../../../services/token-storage.service";
import {Location} from "@angular/common";
import {Flat} from "../../../model/Flat";

@Component({
  selector: 'app-edit-flat',
  templateUrl: './edit-flat.component.html',
  styleUrls: ['./edit-flat.component.css']
})
export class EditFlatComponent implements OnInit {

  title="Edit building form";
  flat=new Flat();
  message = '';
  persons: Array<Person> = [];
  buildings: Array<Building> = [];
  meters: Array<Meter> = [];
  selectedPerson: Person[] = [];
  selectedMeters: Meter[] = [];
  selectedBuilding=new Building();
  availableFlats:number[]=[];
  isSuccessful=false;
entranceExist=false;

  constructor(private flatService: FlatService,
              private personService: PersonService,
              private buildingService: BuildingService,
              private meterService: MeterService,
              private route: ActivatedRoute,
              private router: Router,
              public tokenStorageService:TokenStorageService,
              private _location: Location,)
  {
    this.tokenStorageService.getPersonData();
  }

  ngOnInit(): void {
    this.message = '';

    this.getFlatById(this.route.snapshot.paramMap.get('id'));
    this.getAllPersons();
    this.getAllBuildings();
    this.getAllMeters();

  }
  private getAllPersons(): void {
    this.flatService.getPersons()
      .subscribe(
        response => {
          this.persons=[];
          for (let item in response) {
              for (var i in response[item].roles) {
              if (response[item].roles[i].name === "ROLE_USER") {
                response[item].bindName = response[item].name + " " + response[item].surname;
                this.persons.push(response[item]);
              }
            }
          }
        },
        error => {
          console.log(error);
        });
    // return response;
  }
  private getAllMeters(): void {
    this.flatService.getMeters()
      .subscribe(
        response => {
          this.meters=[];
          for (let item in response) {
            response[item].bindName = response[item].serial + " " + response[item].type;
            this.meters.push(response[item]);
          }
        },
        error => {
          console.log(error);
        });
    // return response;
  }
  private getAllBuildings(): void {
    this.flatService.getBuildings()
      .subscribe(
        response => {
          this.buildings=[];
          for (let item in response) {
            if(!response[item].entranceNo){
              response[item].bindName = response[item].address.city + " " + response[item].address.raion+ " " + response[item].address.street+ " " + response[item].address.houseNumber
            }
            else {
              response[item].bindName = response[item].address.city + " " + response[item].address.raion+ " " + response[item].address.street+ " " + response[item].address.houseNumber+"/"+response[item].address.entranceNo;
            }
            this.buildings.push(response[item]);

          }
        },
        error => {
          console.log(error);
        });
    // return response;
  }
  getAvailableFlatsByBuilding(): void {
    let buildingId=this.selectedBuilding?.buildingid;
    this.flatService.getAvailableFlatsByBuildingId(buildingId)
      .subscribe(
        response => {
          this.availableFlats = [];
          this.availableFlats=response;
        },
        error => {
          console.log(error);
        });
    // return response;
  }
  private getFlatById(id: string | number | null):void {
    this.flatService.getById(id)
      .subscribe(
        data => {
          this.flat = data;
          for(var i in data.person){
            data.person[i].bindName=data.person[i].name+" "+data.person[i].surname;
          }
          for(var i in data.meter){
            data.meter[i].bindName=data.meter[i].serial+" "+data.meter[i].serial;
          }
          if (data.building.address.entranceNo){
            this.entranceExist=true;
            data.building.bindName=data.building.address.city+" "+data.building.address.raion+" "+
              data.building.address.street+" "+ data.building.address.houseNumber+"/"+data.building.address.entranceNo;
          }else{
            data.building.bindName=data.building.address.city+" "+data.building.address.raion+" "+ data.building.address.street+" "+ data.building.address.houseNumber;

          }
          this.selectedBuilding=data.building;
          this.selectedPerson=data.person;
          this.selectedMeters=data.meter;
          this.getAvailableFlatsByBuilding();

        },
        error => {
          console.log(error);
        });
  }
  updateFlat(playlistForm: { reset: () => void; }): void {
    this.flat.building=this.selectedBuilding;
    this.flat.person=this.selectedPerson;
    this.flat.meters=this.selectedMeters;
    this.flatService.editFlat(this.flat.flatid, this.flat)
      .subscribe(
        response => {
          this.isSuccessful = true
          this.message = 'The flat was updated successfully!';
        },
        error => {
          console.log(error);
        });
    setTimeout(()=>{
      playlistForm.reset();
      this.router.navigate(['/flats']);
    }, 1000);
  }
  updatePublished(status: any): void {
    const data = {
      title: this.flat.title,
      description: this.flat.flatid,
      published: status
    };

    this.flatService.editFlat(this.flat.flatid, data)
      .subscribe(
        response => {
          this.flat.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }
  backClicked() {
    this._location.back();
  }

}
