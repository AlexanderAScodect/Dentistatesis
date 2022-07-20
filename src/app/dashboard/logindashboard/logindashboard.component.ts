import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { adminservice } from 'src/app/services/admin.service';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-logindashboard',
    templateUrl: './logindashboard.component.html',
    styleUrls: ['./logindashboard.component.css']
})
export class LoginDashboardComponent implements OnInit {

    constructor(private adminService: adminservice,private router2: ActivatedRoute, private router: Router) {

    }


    form = new FormGroup({
        Correo: new FormControl('', [Validators.required, Validators.email]),
        Clave: new FormControl('', [Validators.required])
    })


    validarsesion(){
        const dni = sessionStorage.getItem("Dni_Ad")
        const toke = sessionStorage.getItem("token")
        if(toke || dni){
            Swal.fire({
                title: 'sesion valida',
                icon: 'success',
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 1000
            }).then((result) => {
                this.router.navigateByUrl('/dashboard/servicio')
            })
        }
    }


    validarcuenta(){
        if(this.form.valid){
            console.log(this.form.value)
            this.adminService.obtenertoken(this.form.value).subscribe((res: any) => {
                if(res.token){
                    let datos = {
                        token: res.token,
                        Dni_Ad: res.dni_ad
                    }
                    Swal.fire({
                        title: 'datos validos',
                        icon: 'success',
                        showConfirmButton: false,
                        timerProgressBar: true,
                        timer: 1000
                    }).then((result) => {
                        sessionStorage.setItem("token", datos.token); 
                        sessionStorage.setItem("Dni_Ad", datos.Dni_Ad); 
                        this.router.navigateByUrl('/dashboard/servicio')
                    })
                }
                else{
                    Swal.fire({
                        title: 'datos invalidos',
                        icon: 'error',
                        showConfirmButton: false,
                        timerProgressBar: true,
                        timer: 1000
                    })
                }
            })
        }else{
            Swal.fire({
                title: 'Datos incompletos',
                icon: 'error',
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 1000
                
            })
        }
    }



    ngOnInit(): void {
        this.validarsesion()
    }

}
