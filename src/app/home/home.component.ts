import { Component, OnInit } from '@angular/core';
import Flickity from 'flickity'
import Swal from 'sweetalert2';

let $: any

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public isCollapsed = false;
    constructor() { }

    images = [
        "http://www.clinicacanoalvarez.com/sites/default/files/slider_coca_adulto.jpg",
        "http://www.clinicacanoalvarez.com/sites/default/files/slider_odontologico.jpg",
        "http://www.clinicacanoalvarez.com/sites/default/files/slider_coca_home1_0.jpg"
    ]

    ngOnInit(): void {

    }
    
}