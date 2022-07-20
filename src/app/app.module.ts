import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { CategoriaComponent } from './dashboard/categoria/categoria.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CitasComponent } from './dashboard/citas/citas.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { DoctoresComponent } from './dashboard/doctores/doctores.component';
import { PacientesComponent } from './dashboard/pacientes/pacientes.component';
import { ServicioComponent } from './dashboard/servicio/servicio.component';
import { UtensiliosComponent } from './dashboard/utensilios/utensilios.component';
import { UtensilioscitaComponent } from './dashboard/utensilioscita/utensilioscita.component';
import { LoginDashboardComponent } from './dashboard/logindashboard/logindashboard.component';
import { HomeComponent } from './home/home.component';
import { CitaComponent } from './cita/cita.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeFooterComponent } from './home-footer/home-footer.component';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import {MatButtonModule} from '@angular/material/button';
import { PacienteLoginComponent } from './login/pacientelogin.component';
import { PacienteComponent } from './paciente/paciente.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { DoctorComponent } from './doctor/doctor/doctor.component';
import { CitasDoctorComponent } from './doctor/citasdoctor/citasdoctor.component';
import {MatStepperModule} from '@angular/material/stepper';


@NgModule({
  declarations: [
    AppComponent,
    DoctoresComponent,
    LoginDashboardComponent,
    PacientesComponent,
    CitasComponent,
    CategoriaComponent,
    ServicioComponent,
    UtensiliosComponent,
    UtensilioscitaComponent,
    DashboardComponent,
    HomeComponent,
    CitaComponent,
    NavbarComponent,
    HomeFooterComponent,
    PacienteLoginComponent,
    PacienteComponent,
    DoctorComponent,
    CitasDoctorComponent
  ],
  imports: [
    MatTabsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    NgbModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatButtonToggleModule,
    MatStepperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
