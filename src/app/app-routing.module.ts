import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './dashboard/categoria/categoria.component';
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
import { PacienteLoginComponent } from './login/pacientelogin.component';
import { PacienteComponent } from './paciente/paciente.component';
import { DoctorComponent } from './doctor/doctor/doctor.component';
import { CitasDoctorComponent } from './doctor/citasdoctor/citasdoctor.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'paciente',
        component: PacienteComponent
    },
    {
        path: 'doctor',
        component: DoctorComponent,
        children: [
            {
                path: '',
                component: CitasDoctorComponent
            }
        ]
    },
    {
        path: 'paciente/login',
        component: PacienteLoginComponent
    },
    {
        path: 'doctor/login',
        component: PacienteLoginComponent
    },
    {
        path: 'dashboard/login',
        component: LoginDashboardComponent
    },
    {
        path: 'cita',
        component: CitaComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'doctores',
                component: DoctoresComponent
            },
            {
                path: 'pacientes',
                component: PacientesComponent
            },
            {
                path: 'citas',
                component: CitasComponent
            },
            {
                path: 'categorias',
                component: CategoriaComponent
            },
            {
                path: 'servicio',
                component: ServicioComponent
            },
            {
                path: 'utencilios',
                component: UtensiliosComponent
            },
            {
                path: 'utencilioscita',
                component: UtensilioscitaComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
