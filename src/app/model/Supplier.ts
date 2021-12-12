import {Address} from "./Address";
import {MeterDest} from "./MeterDest";


export class Supplier {

  supplierid?: Number;
  supplierName?: String;
  iban?: String;
  fiscalCode?: String;
  bankCode?: String;
  details?: String;
  meterDest?:MeterDest;
  address?: Address;
  title?:String;
  published?:String;
}
