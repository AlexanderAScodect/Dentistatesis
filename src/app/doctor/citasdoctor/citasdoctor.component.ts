import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CitaService } from 'src/app/services/citas.servicios';
import { DoctorService } from 'src/app/services/doctor.service';
import { pacientesService } from 'src/app/services/paciente.service';
import { serviciosService } from 'src/app/services/servicio.service';
import flatpickr from 'flatpickr'
import Swal from 'sweetalert2'
import * as moment from 'moment';

@Component({
    selector: 'app-citasdoctor',
    templateUrl: './citasdoctor.component.html',
    styleUrls: ['./citasdoctor.component.css']
})
export class CitasDoctorComponent implements OnInit {
    active = '1'
    linear=false
    page = 1
    catdesordenado:servicio[]
    pageSize = 5
    ordenado:boolean=false;
    servicios = []
    citas = []
    pacientes = []
    cita = {
        hora: null,
        fecha: null
    }
    formpac=new FormGroup({
        Nombre: new FormControl('', Validators.required),
        Correo: new FormControl('', Validators.required),
        DniPa: new FormControl('', Validators.required),
        Clave: new FormControl('', Validators.required),
        Telefono: new FormControl('', Validators.required),
        Edad: new FormControl('', Validators.required),
        Obeservaciones: new FormControl('', Validators.required)

    })

    form = new FormGroup({
        Nombre: new FormControl('', Validators.required),
        Correo: new FormControl('', Validators.required),
        DniDo: new FormControl('', Validators.required),
        Clave: new FormControl('', Validators.required),
        Telefono: new FormControl('', Validators.required)
    })

    formservicio = new FormGroup({
        Fechadia: new FormControl('', Validators.required),
        Fechahora: new FormControl('', Validators.required),
        DniDo: new FormControl('', Validators.required),
        NombreDoctor: new FormControl('', Validators.required),
        DniPa: new FormControl('', Validators.required),
        NombrePaciente: new FormControl('', Validators.required),
        IdCitas: new FormControl('', Validators.required),
        Total: new FormControl('', Validators.required),
        Observaciones: new FormControl('', Validators.required)
    })
    constructor(private servicioservice: serviciosService, private router: Router, 
                private doctorservice: DoctorService, private modalserv: NgbModal, 
                private pacienteservice: pacientesService, private citaservice: CitaService) { }
            abrirmodalpaciente(){
            if(this.formpac.valid){
                let datos = null
                    datos = {
                      DniPa: this.formpac.value.DniPa ,
                        Nombre: this.formpac.value.Nombre,
                        Correo: this.formpac.value.Correo,
                        Clave: this.formpac.value.Clave,
                        Telefono: this.formpac.value.Telefono,
                        Edad: this.formpac.value.Edad,
                        Obeservaciones: this.formpac.value.Obeservaciones,
                        Delete: false 
                    }
                   this.pacienteservice.guardar(datos).subscribe((fabi: any) => {
                })
                this.modalserv.dismissAll()
                this.formpac.reset()
                this.getpacientes()
            }
        }
        sortEdad(){
            if(this.ordenado){
                this.getserviciosporDoctor()
                this.ordenado=false
            }else{
                this.ordenado=true
                this.servicios.sort((a, b) => a.fecha.localeCompare(b.fecha))
            }
          }
          realizadocita(datos) {
            datos.realizo = false
            this.servicioservice.editar(datos).subscribe(res => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Se han guardado los cambios',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        }
    submit(){
        let datos = null
        datos = {
            Fechadia: this.cita.fecha,
            Fechahora: this.cita.hora,
            DniDo: this.formservicio.value.DniDo,
            DniPa: this.formservicio.value.DniPa,
            IdCitas: this.formservicio.value.IdCitas,
            Observaciones: this.formservicio.value.Observaciones,
            Delete: false,
            Total: this.formservicio.value.Total,
            realizo:false,
        }
        if(this.formservicio.valid){
            this.servicioservice.guardar(datos).subscribe((res: any) => {
                Swal.fire({
                    title: 'Cita creada',
                    icon: 'success',
                    showConfirmButton: false,
                    timerProgressBar: true,
                    timer: 2000
                }).then((result) => {
                    this.active = '1'
                    this.formservicio.reset()
                    this.getserviciosporDoctor()
                })

                
            })
        }
        else{
            Swal.fire({
                title: 'Llene todos los campos',
                icon: 'warning',
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 1000
            })
            
        }console.log(this.formservicio.value)
    }

    abrirmodal(modal){
        this.modalserv.open(modal, { size: 'lg' })
    }


    getserviciosporDoctor(){
        this.servicioservice.getserviciosPorDoctor(this.form.value.DniDo).subscribe((res: any) => {
            this.servicios = res
        })
    }

    getcitas(){
        this.citaservice.getcitas().subscribe((res: any) => this.citas = res)
    }

    getpacientes(){
        this.pacienteservice.getpacientes().subscribe((res: any) => this.pacientes=res)
        
        
    }

    cambiarcita(idcita){
        this.formservicio.patchValue({
            Total: this.citas.find(fab => fab.IdCitas == idcita).Precio
        })
    }

    selecpaciente(datos){
        this.formservicio.patchValue({
            DniPa: datos.DniPa,
            NombrePaciente: datos.Nombre
        })
        this.modalserv.dismissAll()
    }

    mostrarcrearcita(){
        var ahora = moment().add(2, 'seconds').format('hh:mm');
        flatpickr('#fecha-servicio', {
            minDate: "today",
            defaultDate:"today",
            onChange: (selectedDates, dateStr, instance) => {
                this.cita.fecha = dateStr
            }
        })
        flatpickr('#hora-servicio', {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            
            maxTime: "21:30",
            defaultDate:ahora,
            onChange: (selectedDates, dateStr, instance) => {
                this.cita.hora = dateStr
            }
        })
    }

    validarcuenta(){
        const datos = localStorage.getItem("datos_doctor")

        if(!datos){
            this.router.navigateByUrl('')
        }
        else{
            this.doctorservice.getdoctor().subscribe((res: doctor[]) => {
                const datosdoctor = res.find(fab => fab.DniDo == JSON.parse(datos).DniDo)
                if(datosdoctor){
                    this.form.patchValue({
                        DniDo: datosdoctor.DniDo,
                        Nombre: datosdoctor.Nombre,
                        Correo: datosdoctor.Correo,
                        Clave: datosdoctor.Clave,
                        Telefono: datosdoctor.Telefono.toString().trim(),
                    })

                    this.formservicio.patchValue({
                        DniDo: this.form.value.DniDo,
                        NombreDoctor: this.form.value.Nombre
                    })


                    this.getserviciosporDoctor()

                }
            })
        }
    }

    ngOnInit(): void {
        this.validarcuenta()
        this.getcitas()
        this.getpacientes()
    }

}
interface servicio{
    Fechadia
}
interface doctor {
    Nombre,
    Correo,
    DniDo,
    Clave,
    Telefono
}
interface paciente{
    Nombre,
    Correo,
    DniPa,
    Clave,
    Telefono,
    Edad,
    Obeservaciones
}
