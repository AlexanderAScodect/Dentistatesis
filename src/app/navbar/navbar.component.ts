import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(private router: Router) { }

    validarcuenta(tipo){
        const datos = localStorage.getItem("datos_" + tipo)
        if(datos){
            this.router.navigateByUrl(tipo)
        }
        else {
            this.router.navigateByUrl(tipo + '/login')
        }
    }

    ngOnInit(): void {
        console.log()
    }

}
