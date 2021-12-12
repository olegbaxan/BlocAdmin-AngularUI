import { Component, OnInit } from '@angular/core';
import {Building} from "../../../model/Building";
import {parameters} from "../../../constants/constants";
import {BuildingService} from "../../../services/building.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {FileUploadService} from "../../../services/file-upload.service";
import {File} from "../../../model/File";
import {InvoiceService} from "../../../services/invoice.service";

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent implements OnInit {
  file: File|undefined;
  message = '';
  query = '';

  files: File[] = [];
  currentIndex = -1;
  title = '';
  page = parameters.page;
  count = parameters.count;
  pageSize = parameters.pageSize;
  pageSizes = parameters.pageSizes;
  constructor(private fileUploadService: FileUploadService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private invoiceService: InvoiceService,
              public tokenStorageService:TokenStorageService,)
  {
    this.tokenStorageService.getPersonData();
  }

  ngOnInit(): void {
    this.retrieveFiles();
  }
  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveFiles() {
    // const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.fileUploadService.getFiles()
      .subscribe(
        response => {
          console.log("Filedresp",response);
          this.files = response;
          console.log("Files",this.files);
          this.getInvoiceFileInfo()
        },
        error => {
          console.log(error);
          this.authService.logout(error.error.error);
        });
  }
  getInvoiceFileInfo(): void {
    for (let item in this.files) {
      if (this.files[item].name) {
        console.log("FileID=",this.files[item].name)
        this.invoiceService.getFilesById(this.files[item].name)
          .subscribe(
            response => {
              const {invoiceFile, fileInfo} = response;
              this.files[item].invoiceFile = invoiceFile;
              this.files[item].fileInfo = fileInfo[0];
              console.log("InvoiceFile",this.files[item].invoiceFile);
              console.log("InvoicefileInfo",this.files[item].fileInfo);
            },
            error => {
              console.log(error);
            });
      }
      // this.invoices.push(invoices[item]);
    }

  }
  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveFiles();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveFiles();
  }


}
