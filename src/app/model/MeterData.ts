import {Meter} from "./Meter";
import {Status} from "./Status";


export class MeterData {

  meterdataid?: Number;
  previousValue?: any;
  currentValue?: any;
  meterValue?: number;
  status?: Status;
  meter?: Meter;
  title?:String;
  published?:String;
}
