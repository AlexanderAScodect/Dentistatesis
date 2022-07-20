import { Component, OnInit } from '@angular/core';
import { CitaService } from '../services/citas.servicios';
import flatpickr from 'flatpickr'
import { DoctorService } from '../services/doctor.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { pacientesService } from '../services/paciente.service';
import { serviciosService } from '../services/servicio.service';

@Component({
    selector: 'app-cita',
    templateUrl: './cita.component.html',
    styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {

    citas
    pacientesesion = false
    doctores
    paciente = null
    servicios_fechas = []
    cita = {
        hora: null,
        fecha: null
    }

    form = new FormGroup({
        DniPa: new FormControl('', Validators.required),
        Nombre: new FormControl('', Validators.required),
        Correo: new FormControl('', [Validators.required, Validators.email]),
        Edad: new FormControl('', Validators.required),
        Clave: new FormControl('', Validators.required),
        Telefono: new FormControl('', Validators.required),
        Observaciones: new FormControl('', Validators.required),
        //
        Fechadia: new FormControl('', Validators.required),
        Fechahora: new FormControl('', Validators.required),
        DniDo: new FormControl('', Validators.required),
        IdCitas: new FormControl('', Validators.required),

    })

    constructor(private citaservice:CitaService, private doctorservice: DoctorService, private pacienteservice: pacientesService, private router: Router, private servicioservice: serviciosService) { }

    getcitas(){
        this.citaservice.getcitas().subscribe((res: any) => this.citas = res)
    }

    getdoctores(){
        this.doctorservice.getdoctor().subscribe((res: any) => this.doctores = res)
    }

    getservicios(){
        this.servicioservice.getservicios().subscribe((res: Servicio[]) => {
            res.forEach((x) => {
                if(x.Fechadia){
                    this.servicios_fechas.push(x.Fechadia.split("T")[0])
                }
                
            })
        })
    }

    submit(){
        console.log(this.form.value)
        if(this.form.valid){
            this.form.patchValue({
                Fechadia: this.cita.fecha,
                Fechahora: this.cita.hora
            })

            console.log(this.form.value)


            let paciente = {
                DniPa: this.form.value.DniPa,
                Nombre: this.form.value.Nombre,
                Correo: this.form.value.Correo,
                Edad: this.form.value.Edad,
                Clave: this.form.value.Clave,
                Telefono: this.form.value.Telefono,
                Obeservaciones: this.form.value.Observaciones,
                Delete: false,
            }

            let servicio = {
                Fechadia: this.form.value.Fechadia,
                Fechahora: this.form.value.Fechahora,
                DniDo: this.form.value.DniDo,
                DniPa: paciente.DniPa,
                IdCitas: this.form.value.IdCitas,
                Observaciones: paciente.Obeservaciones,
                Delete: false,
                Total: 0,
                realizo:true,
            }

            this.citas.forEach((x) => {
                if(x.IdCitas == servicio.IdCitas){
                    servicio.Total = x.Precio
                }
            })

            setTimeout(() => {
                if(!this.pacientesesion){

                    this.pacienteservice.guardar(paciente).subscribe((res: any) => {

                        this.servicioservice.guardar(servicio).subscribe((res: any) => {
                            Swal.fire({
                                title: '',
                                text: 'Ha creado cita con exito, inicie sesion para ver sus citas!',
                                icon: 'success',
                                showCancelButton: true,
                                confirmButtonText: 'Aceptar',
                                cancelButtonText: 'Cancelar',
                                confirmButtonColor: '#044e6e'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    Swal.fire({
                                        title: 'Espere',
                                        icon: 'warning',
                                        showConfirmButton: false,
                                        timerProgressBar: true,
                                        timer: 2000
                                    })
                                    setTimeout(() => {
                                        this.router.navigateByUrl('/paciente/login')
                                    }, 2000)
                                } else if (result.isDenied) {}
                            })
                        })

                    })
                }
                else{
                    this.servicioservice.guardar(servicio).subscribe((res: any) => {
                        Swal.fire({
                            title: '',
                            text: 'Ha creado cita con exito, esta cita aparecera en la seccion de sus citas!',
                            icon: 'success',
                            showCancelButton: true,
                            confirmButtonText: 'Aceptar',
                            cancelButtonText: 'Cancelar',
                            confirmButtonColor: '#044e6e'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                Swal.fire({
                                    title: 'Espere',
                                    icon: 'warning',
                                    showConfirmButton: false,
                                    timerProgressBar: true,
                                    timer: 2000
                                })
                                setTimeout(() => {
                                    this.router.navigateByUrl('/paciente')
                                }, 2000)
                            } else if (result.isDenied) {}
                        })
                    })
                }
            }, 500)





            console.log(paciente)
            console.log(servicio)
        }
    }

    validardatos(){
        const datos = localStorage.getItem("datos_paciente")

        if(datos){
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
                        Observaciones:datospaciente.Obeservaciones.toString().trim()
                    })

                    this.pacientesesion = true

                }
            })
        }

    }

    pacienteiniciosesion(){

    }

    ngOnInit(): void {
        this.getcitas()
        this.getdoctores()
        this.getservicios()
        this.validardatos()

        setTimeout(() => {
            flatpickr('#fecha-cita', {
                disable: this.servicios_fechas,
                minDate: "today",
                onChange: (selectedDates, dateStr, instance) => {
                    this.cita.fecha = dateStr
                }
            })
            flatpickr('#hora-cita', {
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
                maxTime: "21:30",
                onChange: (selectedDates, dateStr, instance) => {
                    this.cita.hora = dateStr
                }
            })
        }, 1000)

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
