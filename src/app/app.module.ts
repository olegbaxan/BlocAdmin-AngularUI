import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AddAddressComponent} from './components/address/add-address/add-address.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LeftmenuComponent} from './components/leftmenu/leftmenu.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {ListAddressComponent} from './components/address/list-address/list-address.component';
import {EditAddressComponent} from './components/address/edit-address/edit-address.component';
import {NgbAccordionModule, NgbAlertModule, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';
import {authInterceptorProviders} from './components/auth/auth.interceptor';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {HomeComponent} from './components/auth/home/home.component';
import {ProfileComponent} from './components/auth/profile/profile.component';
import {BoardAdminComponent} from './components/auth/board-admin/board-admin.component';
import {BoardBlocadminComponent} from './components/auth/board-blocadmin/board-blocadmin.component';
import {BoardPersonComponent} from './components/auth/board-person/board-person.component';
import {AddPersonComponent} from './components/person/add-person/add-person.component';
import {EditPersonComponent} from './components/person/edit-person/edit-person.component';
import {ListPersonComponent} from './components/person/list-person/list-person.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {AddSupplierComponent} from './components/supplier/add-supplier/add-supplier.component';
import {EditSupplierComponent} from './components/supplier/edit-supplier/edit-supplier.component';
import {ListSupplierComponent} from './components/supplier/list-supplier/list-supplier.component';
import {AddMeterdataComponent} from './components/meterdata/add-meterdata/add-meterdata.component';
import {EditMeterdataComponent} from './components/meterdata/edit-meterdata/edit-meterdata.component';
import {ListMeterdataComponent} from './components/meterdata/list-meterdata/list-meterdata.component';
import {ListMeterComponent} from './components/meter/list-meter/list-meter.component';
import {EditMeterComponent} from './components/meter/edit-meter/edit-meter.component';
import {AddMeterComponent} from './components/meter/add-meter/add-meter.component';
import {AddInvoiceComponent} from './components/invoice/add-invoice/add-invoice.component';
import {EditInvoiceComponent} from './components/invoice/edit-invoice/edit-invoice.component';
import {ListInvoiceComponent} from './components/invoice/list-invoice/list-invoice.component';
import {ListFlatComponent} from './components/flat/list-flat/list-flat.component';
import {EditFlatComponent} from './components/flat/edit-flat/edit-flat.component';
import {AddFlatComponent} from './components/flat/add-flat/add-flat.component';
import {AddBuildingComponent} from './components/building/add-building/add-building.component';
import {EditBuildingComponent} from './components/building/edit-building/edit-building.component';
import {ListBuildingComponent} from './components/building/list-building/list-building.component';
import {UploadImagesComponent} from './components/file/upload-images/upload-images.component';
import {BulkMeterdataComponent} from './components/meterdata/bulk-meterdata/bulk-meterdata.component';
import {AddPaymentComponent} from './components/payment/add-payment/add-payment.component';
import {EditPaymentComponent} from './components/payment/edit-payment/edit-payment.component';
import {ListPaymentComponent} from './components/payment/list-payment/list-payment.component';
import {BulkaddMeterdataComponent} from './components/meterdata/bulkadd-meterdata/bulkadd-meterdata.component';
import {ForgotPasswordComponent} from './components/auth/forgot-password/forgot-password.component';
import {PasswordResetComponent} from './components/auth/password-reset/password-reset.component';
import {ChangePasswordComponent} from './components/auth/change-password/change-password.component';
import {DatePipe} from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LeftmenuComponent,
    AddAddressComponent,
    ListAddressComponent,
    EditAddressComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardBlocadminComponent,
    BoardPersonComponent,
    AddPersonComponent,
    EditPersonComponent,
    ListPersonComponent,
    AddSupplierComponent,
    EditSupplierComponent,
    ListSupplierComponent,
    AddMeterdataComponent,
    EditMeterdataComponent,
    ListMeterdataComponent,
    ListMeterComponent,
    EditMeterComponent,
    AddMeterComponent,
    AddInvoiceComponent,
    EditInvoiceComponent,
    ListInvoiceComponent,
    ListFlatComponent,
    EditFlatComponent,
    AddFlatComponent,
    AddBuildingComponent,
    EditBuildingComponent,
    ListBuildingComponent,
    UploadImagesComponent,
    BulkMeterdataComponent,
    AddPaymentComponent,
    EditPaymentComponent,
    ListPaymentComponent,
    BulkaddMeterdataComponent,
    ForgotPasswordComponent,
    PasswordResetComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbAccordionModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgSelectModule,
  ],
  providers: [authInterceptorProviders, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
