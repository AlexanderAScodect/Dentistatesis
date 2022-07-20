import { Component, OnInit } from '@angular/core';
import { UtenciliosCitaService } from 'src/app/services/utensiliosCita.servicio';
import { CitaService } from 'src/app/services/citas.servicios';
import { utensiliosService } from 'src/app/services/utensilios.service';

import { MatTableDataSource } from '@angular/material/table';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'app-utensilioscita',
    templateUrl: './utensilioscita.component.html',
    styleUrls: ['./utensilioscita.component.css']
  })
  export class UtensilioscitaComponent implements OnInit {
    uten:utensilios[]
    cit:citas[]
    mostraragregar: false;
    utc:utencitas[]
    public busqueda: any = []
    dataSource:MatTableDataSource<any>;
      page = 1
      pageSize = 5
      utencitasid
      EDITANDO = false;
      catdesordenado:utencitas[]
      ordenado:boolean=false;
      myForm = new FormGroup({
        Cantidad: new FormControl('', Validators.required),
        IdUtensilios: new FormControl('', Validators.required),
        IdCitas: new FormControl('', Validators.required)
      });
    constructor(private utensiCita: UtenciliosCitaService,private cita: CitaService,config: NgbModalConfig, 
      private utensilios: utensiliosService,private modalService: NgbModal, private fb: FormBuilder) { 
          config.backdrop = 'static';
          config.keyboard = false;
     }
     applyFilter(e) {
      let filtro = this.utc.filter(fabian => fabian.cantidad.includes(e.target.value))
      this.utc = filtro
      if (e.target.value.length <= 0) {
          this.getUtenciliosCitaDATOSs()
      }
  }
  cambiaruten(event) {
    this.myForm.value.IdUtensilios = event.target.value;
  }
  cambiarcit(event) {
    this.myForm.value.IdCitas = event.target.value;
  }
  open(content, datos: any) {
    this.modalService.open(content);
    if(datos){
        this.EDITANDO = true
        this.myForm.patchValue({
          Cantidad: datos.cantidad,
          IdUtensilios: datos.IdUtensilios,
          IdCitas: datos.IdCitas
        })
        this.utencitasid = datos.IdUtensiliosCitas
    }
    else{
        this.EDITANDO = false
        this.myForm.patchValue({
          Cantidad: "",
          IdUtensilios: "",
          IdCitas:""
        })
    }
  }
  eliminarcat(datos) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: '¿Está seguro?',
        text: "Esta accion no se podra deshaser",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            this.utensiCita.eliminarcat(datos.IdUtensiliosCitas).subscribe(fabian => {
                this.getUtenciliosCitaDATOSs()
            })
          swalWithBootstrapButtons.fire(
            'Eliminado',
            'El registro ha sido eliminado.',
            'success'
          )
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'La accion ha sido Cancelada',
            'error'
          )
        }
      })       
  }
  getUtenciliosCitaDATOSs(){
    this.utensiCita.getUtenciliosCitaDATOS().subscribe((resp:any)=>{
      this.utc=resp;
    })
    this.dataSource=new MatTableDataSource(this.utc)
  }
  obtenercitas(){
    this.cita.getcitas().subscribe((resp:any)=>{
      this.cit=resp;
    })
    this.dataSource=new MatTableDataSource(this.cit)
  }
  obtenercitasuten(){
    this.utensilios.getutensilios().subscribe((resp:any)=>{
      this.uten=resp;
      
  })
  this.dataSource=new MatTableDataSource(this.uten)
  }
  
    ngOnInit(): void {
      this.getUtenciliosCitaDATOSs()
      this.obtenercitas()
      this.obtenercitasuten()
  }
  onSubmit() {
    if(this.myForm.valid){
        let datos = null
        if(this.EDITANDO){
          
            datos = {
              IdUtensiliosCitas: this.utencitasid,
              Cantidad: this.myForm.value.Cantidad,
              IdUtensilios: this.myForm.value.IdUtensilios,
              IdCitas: this.myForm.value.IdCitas,
                Delete: false
            }
            this.utensiCita.editar(datos).subscribe((fabi: any) => {
                this.modalService.dismissAll()
                this.getUtenciliosCitaDATOSs()
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Se han guardado los cambios',
                    showConfirmButton: false,
                    timer: 1500
                  })
            })
        }
        else{
            datos = {
              Cantidad: this.myForm.value.Cantidad,
              IdUtensilios: this.myForm.value.IdUtensilios,
              IdCitas: this.myForm.value.IdCitas,
                Delete: false
            }
            this.utensiCita.guardar(datos).subscribe((fabi: any) => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Se han guardado los cambios',
                    showConfirmButton: false,
                    timer: 1500
                  })
                this.modalService.dismissAll()
                this.getUtenciliosCitaDATOSs()
            })
        }
    }
  }
  }
  interface utencitas{
    cantidad,
    nombre_utensilio,
    nombre_cita
  }
  interface citas{
    IdCitas
    Nombre,
  }
  interface utensilios{
    IdUtensilios
    Nombre,
  }