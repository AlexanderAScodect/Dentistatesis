import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { pacientesService } from '../services/paciente.service';
import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../services/doctor.service';

@Component({
    selector: 'app-pacientelogin',
    templateUrl: './pacientelogin.component.html',
    styleUrls: ['./pacientelogin.component.css']
})
export class PacienteLoginComponent implements OnInit {


    form = new FormGroup({
        correo: new FormControl('', [Validators.required, Validators.email]),
        clave: new FormControl('', [Validators.required])
    })

    constructor(private pacienteservice: pacientesService, private router: Router, private router2: ActivatedRoute, private doctorservice: DoctorService) { }

    submit(){
        if(this.form.valid){
            const path = this.router2.url['_value'][0].path
            if(path == "paciente"){
                this.pacienteservice.getpacientes().subscribe((res: pacientes[]) => {
                    const paciente = res.find(paciente => paciente.Correo == this.form.value.correo && paciente.Clave == this.form.value.clave)
                    if(paciente != null){
                        let datospaciente = {
                            DniPa: paciente.DniPa
                        }

                        Swal.fire({
                            title: 'Iniciando sesion',
                            icon: 'success',
                            showConfirmButton: false,
                            timerProgressBar: true,
                            timer: 2000
                        }).then((result) => {
                            localStorage.setItem("datos_"+path, JSON.stringify(datospaciente))
                            this.router.navigateByUrl('paciente')
                        })
                    }
                    else{
                        Swal.fire({
                            title: 'Correo o contraseña invalidos',
                            icon: 'error',
                            showConfirmButton: false,
                            timerProgressBar: true,
                            timer: 2000
                        })
                        localStorage.clear()
                    }
                })
            }
            else{
                this.doctorservice.getdoctor().subscribe((res: doctor[]) => {
                    const doctor = res.find(doc => doc.Correo == this.form.value.correo && doc.Clave == this.form.value.clave)
                    if(doctor != null){
                        let datosdoc = {
                            DniDo: doctor.DniDo
                        }

                        Swal.fire({
                            title: 'Iniciando sesion',
                            icon: 'success',
                            showConfirmButton: false,
                            timerProgressBar: true,
                            timer: 2000
                        }).then((result) => {
                            localStorage.setItem("datos_"+path, JSON.stringify(datosdoc))
                            this.router.navigateByUrl(path)
                        })
                    }
                    else{
                        Swal.fire({
                            title: 'Correo o contraseña invalidos',
                            icon: 'error',
                            showConfirmButton: false,
                            timerProgressBar: true,
                            timer: 2000
                        })
                        localStorage.clear()
                    }
                })
            }

        }
    }

    ngOnInit(): void {
    }

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

interface doctor {
    Nombre,
    Correo,
    DniDo,
    Dni,
    Clave,
    Telefono
}
