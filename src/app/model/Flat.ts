import {Address} from "./Address";
import {Building} from "./Building";
import {Person} from "./Person";
import {Meter} from "./Meter";


export class Flat {

  flatid?: Number;
  floor?: Number;
  flatNumber?: Number;
  numberOfPerson?: Number;
  entrance?: Number;
  wallet?: Number;
  person?: Person[];
  building?: Building;
  meters?: Meter[];
  title?:String;
  published?:String;
}
