import {Flat} from "./Flat";
import {Person} from "./Person";

export class Payments{
  paymentsid?: Number;
  payDate?: Date;
  sum?: Number;
  flat?: Flat;
  person?: Person;
  title?:String;
  published?:String;
}
