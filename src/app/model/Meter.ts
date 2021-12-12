import {Person} from "./Person";
import {Flat} from "./Flat";
import {Supplier} from "./Supplier";
import {MeterDest} from "./MeterDest";
import {TypeOfMeterInvoice} from "./TypeOfMeterInvoice";
import {Building} from "./Building";

export class Meter {

  meterId?: any;
  meterDest: MeterDest | undefined;
  serial?: String;
  initialValue?: Number;
  typeOfMeterInvoice?: TypeOfMeterInvoice;
  supplier?: Supplier;
  flat?: Flat;
  person?: Person;
  building?:Building;
  title?:String;
  published?:String;
}
