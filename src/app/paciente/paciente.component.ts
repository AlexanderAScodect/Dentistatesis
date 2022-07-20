import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CitaService } from '../services/citas.servicios';
import { DoctorService } from '../services/doctor.service';
import { pacientesService } from '../services/paciente.service';
import { serviciosService } from '../services/servicio.service';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-paciente',
    templateUrl: './paciente.component.html',
    styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

    form = new FormGroup({
        DniPa: new FormControl('', Validators.required),
        Nombre: new FormControl('', Validators.required),
        Correo: new FormControl('', [Validators.required, Validators.email]),
        Edad: new FormControl('', Validators.required),
        Clave: new FormControl('', Validators.required),
        Telefono: new FormControl('', Validators.required),
        Obeservaciones: new FormControl('', Validators.required),
    })

    servicios = []

    paciente : pacientes = null
    doctor
    cita

    constructor(private router: Router, private servicioservice: serviciosService, private pacienteservice: pacientesService, private doctorservice: DoctorService, private citaservice: CitaService) { }

    getserviciosporPaciente(){
        this.servicioservice.getserviciosPorPaciente(this.paciente.DniPa).subscribe((res: any) => this.servicios = res)
    }

    submit(){
        let datos = null
        if(this.form.value){
            datos = this.form.value
            datos.Obeservaciones = ""
            datos.Telefono = parseInt(this.form.value.Telefono)
            datos.Edad = parseInt(this.form.value.Edad)
            this.pacienteservice.editar(this.form.value).subscribe((res: any) => {
                Swal.fire({
                    title: 'Sus datos se han guardado',
                    icon: 'success',
                    showConfirmButton: false,
                    timerProgressBar: true,
                    timer: 2000
                })


                this.validarcuenta()
            })
        }

    }

    cerrarsesion(){
        localStorage.clear()
        Swal.fire({
            title: 'Cerrando sesion',
            icon: 'info',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000
        }).then((result) => {
            this.router.navigateByUrl('')
        })
    }

    validarcuenta(){
        const datos = localStorage.getItem("datos_paciente")

        if(!datos){
            this.router.navigateByUrl('')
        }
        else{
            this.pacienteservice.getpacientes().subscribe((res: pacientes[]) => {
                const datospaciente = res.find(fab => fab.DniPa == JSON.parse(datos).DniPa)
                if(datospaciente){
                    this.paciente = datospaciente
                    this.form.patchValue({
                        DniPa: datospaciente.DniPa,
                        Nombre: datospaciente.Nombre,
                        Correo: datospaciente.Correo,
                        Edad: datospaciente.Edad.toString().trim(),
                        Clave: datospaciente.Clave,
                        Telefono: datospaciente.Telefono.toString().trim(),
                        Obeservaciones: datospaciente.Obeservaciones
                    })

                    this.getserviciosporPaciente()

                }
            })
        }
    }

    ngOnInit(): void {
        this.validarcuenta()
    }

}

interface Servicio{
    Fechadia,
    Fechahora,
    DniDo,
    DniPa,
    IdCitas,
    Total,
    Observaciones
}

interface pacientes {
    DniPa,
    Nombre,
    Correo,
    Telefono,
    Edad,
    Clave,
    Obeservaciones
}

interface citas {
    Nombre,
    Descripcion,
    Precio
}

interface doctor {
    Nombre,
    Correo,
    DniDo,
    Dni
    Telefono
}
