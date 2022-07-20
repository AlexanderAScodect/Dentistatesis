import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DoctorService } from 'src/app/services/doctor.service';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-doctor',
    templateUrl: './doctor.component.html',
    styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

    showFiller = true

    form = new FormGroup({
        Nombre: new FormControl('', Validators.required),
        Correo: new FormControl('', Validators.required),
        DniDo: new FormControl('', Validators.required),
        Clave: new FormControl('', Validators.required),
        Telefono: new FormControl('', Validators.required)
    })

    constructor(private modalserv: NgbModal, private doctorservice: DoctorService, private router: Router) { }

    openDatos(modal){
        this.modalserv.open(modal)
    }

    cerrarsesion(){
        localStorage.clear()

        Swal.fire({
            title: 'Sesion cerrada',
            icon: 'warning',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000
        }).then((result) => {
            this.router.navigateByUrl('')
        })
    }

    submit(){
        console.log(this.form.value)
        if(this.form.valid){
            let doctor = null

            doctor = {
                DniDo: this.form.value.DniDo,
                Nombre: this.form.value.Nombre,
                Correo: this.form.value.Correo,
                Clave: this.form.value.Clave,
                Telefono: this.form.value.Telefono,
                Delete: false
            }

            this.doctorservice.editar(doctor).subscribe((res: any) => {

                Swal.fire({
                    title: 'Datos guardados',
                    icon: 'success',
                    showConfirmButton: false,
                    timerProgressBar: true,
                    timer: 2000
                }).then((result) => {
                    this.validarcuenta()
                    this.modalserv.dismissAll()
                })

            })
        }
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

                }
            })
        }
    }

    ngOnInit(): void {
        this.validarcuenta()
    }

}


interface doctor {
    Nombre,
    Correo,
    DniDo,
    Clave,
    Telefono
}
