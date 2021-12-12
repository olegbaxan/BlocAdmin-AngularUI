import {Meter} from "./Meter";
import {TypeOfMeterInvoice} from "./TypeOfMeterInvoice";
import {Supplier} from "./Supplier";
import {Status} from "./Status";
import {Building} from "./Building";

export class Invoice {

  invoiceId?: Number;
  invoiceNumber?: String;
  meterDataCurrent?: Number;
  meterDataPrevious?: Number;
  invoiceSum?: Number;
  unitPrice?: Number;
  payTill?: Date;
  emittedDate?: Date;
  dateOfPay?: Date;
  typeOfMeterInvoice: TypeOfMeterInvoice | undefined;
  status: Status | undefined;
  supplier?: Supplier;
  meter?: Meter;
  buildings?: Building[];
  invoiceFileId?:any;
  invoiceFile?:any;
  fileInfo?:any;
  hasMeter:boolean=true;
  countData?:Number;
  title?:String;
  published?:String;
}
