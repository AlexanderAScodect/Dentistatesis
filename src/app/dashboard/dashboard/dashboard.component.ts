import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    showFiller = true
    mostrarAside = false

    constructor(private router: Router) { }
    cerrarsesion(){
        sessionStorage.clear()

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
    validarsesion(){
        const dni = sessionStorage.getItem("Dni_Ad")
        const toke = sessionStorage.getItem("token")

        if(!toke || !dni){
            this.router.navigateByUrl('')
            Swal.fire({
                title: 'sesion invalida',
                icon: 'warning',
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
