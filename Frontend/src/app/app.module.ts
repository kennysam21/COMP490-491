import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { UserTableService } from './services/user-table.service';
import { AfterLoginService } from './services/after-login.service';
import { BeforeLoginService } from './services/before-login.service';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ControllerComponent } from './components/controller/controller.component';
import { WaterUsageComponent } from './components/water-usage/water-usage.component';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CommonModule } from '@angular/common';
import 'flatpickr/dist/flatpickr.css';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    RequestResetComponent,
    ResponseResetComponent,
    SidebarComponent,
    ScheduleComponent,
    ControllerComponent,
    WaterUsageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SnotifyModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBjpDJjvK5T22oDGrQyrY1Vl-qzYU1cytM'
    }),
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgbModule,
    CommonModule,
    FlatpickrModule.forRoot()
  ],
  providers: [AuthService, TokenService, UserTableService, AfterLoginService, BeforeLoginService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
