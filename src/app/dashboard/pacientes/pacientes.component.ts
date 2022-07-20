import { Component, OnInit } from '@angular/core';
import { pacientesService } from 'src/app/services/paciente.service';

import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
  mostraragregar: false;
  pac:pacientes[]
  busqueda: pacientes[]
  constructor(private paciente: pacientesService, config: NgbModalConfig, private modalService: NgbModal, private fb: FormBuilder) {
    config.backdrop = 'static';
    config.keyboard = false;
   }
  dataSource:MatTableDataSource<any>;
    page = 1
    pageSize = 5
    pacienteid
    EDITANDO = false;
    catdesordenado:pacientes[]
    ordenado:boolean=false;
    emailFormControl = new FormControl('', [Validators.required, Validators.email]);
    myForm = new FormGroup({
        DniPa: new FormControl('', Validators.required),
        Nombre: new FormControl('', Validators.required),
        Correo: new FormControl('', Validators.required),
        Clave: new FormControl('', Validators.required),
        Telefono: new FormControl('', Validators.required),
        Edad: new FormControl('', Validators.required),
        Obeservaciones: new FormControl('', Validators.required)
    });
  applyFilter(e){
    let filtro=this.pac.filter(fabian => fabian.DniPa.toString().includes(e.target.value.toString()))
    this.pac=filtro
    if(e.target.value.length<=0){
        this.obtenerpacientes()
    }
    
}
opened(content, datos:any) {
  this.modalService.open(content);
  this.myForm.patchValue({
    Telefono: datos.Telefono,
    Edad: datos.Edad,
    Obeservaciones: datos.Obeservaciones
  })
}
open(content, datos: any) {
  this.modalService.open(content);
  if(datos){
      this.EDITANDO = true
      this.myForm.patchValue({
        DniPa: datos.DniPa,
          Nombre: datos.Nombre,
          Correo: datos.Correo,
          Clave: datos.Clave,
          Telefono: datos.Telefono,
          Edad: datos.Edad,
          Obeservaciones: datos.Obeservaciones
      })
      this.pacienteid = datos.DniPa
  }
  else{
      this.EDITANDO = false
      this.myForm.patchValue({
        DniPa: "",
          Nombre: "",
          Correo: "",
          Clave: "",
          Telefono: "",
          Edad: "",
          Obeservaciones: ""
      })
  }
}
sortNombre(){
  
  if(this.ordenado){
      this.obtenerpacientes()
      this.ordenado=false
  }else{
      this.ordenado=true
      this.catdesordenado=this.pac;
      this.pac.sort((a, b) => a.Nombre.localeCompare(b.Nombre))
  }
}
sortEdad(){
  if(this.ordenado){
      this.obtenerpacientes()
      this.ordenado=false
  }else{
      this.ordenado=true
      this.catdesordenado=this.pac;
      this.pac.sort((a, b) => a.Edad.localeCompare(b.Edad))
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
          this.paciente.eliminarcat(datos.DniPa).subscribe(fabian => {
              this.obtenerpacientes()
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
obtenerpacientes(){
  this.paciente.getpacientes().subscribe((resp:any)=>{
    this.pac=resp;
})
this.dataSource=new MatTableDataSource(this.pac)
}
  ngOnInit(): void {
    this.obtenerpacientes()
    
  }
  onSubmit() {
        
    if(this.myForm.valid){
        let datos = null
        if(this.EDITANDO){

            datos = {
              DniPa: this.myForm.value.DniPa ,
                Nombre: this.myForm.value.Nombre,
                Correo: this.myForm.value.Correo,
                Clave: this.myForm.value.Clave,
                Telefono: this.myForm.value.Telefono,
                Edad: this.myForm.value.Edad,
                Obeservaciones: this.myForm.value.Obeservaciones,
                Delete: false
                
            }
            
            this.paciente.editar(datos).subscribe((fabi: any) => {
                
              this.modalService.dismissAll()
                this.obtenerpacientes()
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
              DniPa: this.myForm.value.DniPa ,
              Nombre: this.myForm.value.Nombre,
              Correo: this.myForm.value.Correo,
              Clave: this.myForm.value.Clave,
              Telefono: this.myForm.value.Telefono,
              Edad: this.myForm.value.Edad,
              Obeservaciones: this.myForm.value.Obeservaciones,
                Delete: false
            }
            this.paciente.guardar(datos).subscribe((fabi: any) => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Se han guardado los cambios',
                    showConfirmButton: false,
                    timer: 1500
                  })
                this.modalService.dismissAll()
                this.obtenerpacientes()
            })
        }
    }
    
}
}

interface pacientes{
  DniPa,
  Nombre,
  Correo,
  Telefono,
  Edad,
  Obeservaciones
}