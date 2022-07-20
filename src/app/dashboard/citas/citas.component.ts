import { Component, OnInit } from '@angular/core';
import { CitaService } from 'src/app/services/citas.servicios';

import { MatTableDataSource } from '@angular/material/table';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  mostraragregar: false;
  cit:citas[]
  public busqueda: any = []
  dataSource:MatTableDataSource<any>;
    page = 1
    pageSize = 5
    citaid
    EDITANDO = false;
    citadesordenado:citas[]
    ordenado:boolean=false;
    myForm = new FormGroup({
        Nombre: new FormControl('', Validators.required),
        Descripcion: new FormControl('', Validators.required),
        Precio: new FormControl('', Validators.required),
    });
  constructor(private cita: CitaService, config: NgbModalConfig, private modalService: NgbModal, private fb: FormBuilder) { 
    config.backdrop = 'static';
        config.keyboard = false;
  }

  applyFilter(e){
    let filtro=this.cit.filter(fabian => fabian.Nombre.includes(e.target.value))
    this.cit=filtro
    if(e.target.value.length<=0){
        this.obtenercitas()
    }
   
}
open(content, datos: any) {
  this.modalService.open(content);
  if(datos){
      this.EDITANDO = true
      this.myForm.patchValue({
          Nombre: datos.Nombre,
          Descripcion: datos.Descripcion,
          Precio: datos.Precio
      })
      this.citaid = datos.IdCitas
  }
  else{
      this.EDITANDO = false
      this.myForm.patchValue({
          Nombre: "",
          Descripcion: "",
          Precio:""
      })
  }
}
sortNombre(){
        
  if(this.ordenado){
      this.obtenercitas()
      this.ordenado=false
  }else{
      this.ordenado=true
      this.citadesordenado=this.cit;
      this.cit.sort((a, b) => a.Nombre.localeCompare(b.Nombre))
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
          this.cita.eliminarcat(datos.IdCitas).subscribe(fabian => {
              this.obtenercitas()
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
onSubmit() {
        
  if(this.myForm.valid){
      let datos = null
      if(this.EDITANDO){

          datos = {
            IdCitas: this.citaid,
              Nombre: this.myForm.value.Nombre,
              Descripcion: this.myForm.value.Descripcion,
              Precio: this.myForm.value.Precio,
              Delete: false
          }
          this.cita.editar(datos).subscribe((fabi: any) => {
              this.modalService.dismissAll()
              this.obtenercitas()
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
              Nombre: this.myForm.value.Nombre,
              Descripcion: this.myForm.value.Descripcion,
              Precio: this.myForm.value.Precio,
              Delete: false
          }
          this.cita.guardar(datos).subscribe((fabi: any) => {
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Se han guardado los cambios',
                  showConfirmButton: false,
                  timer: 1500
                })
              this.modalService.dismissAll()
              this.obtenercitas()
          })
      }
  }
  
}
obtenercitas(){
  this.cita.getcitas().subscribe((resp:any)=>{
    this.cit=resp;
  })
  this.dataSource=new MatTableDataSource(this.cit)
}
  ngOnInit(): void {
    this.obtenercitas()
  
  }

}
interface citas{
Nombre,
Descripcion,
Precio
}