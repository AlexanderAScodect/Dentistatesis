import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { utensiliosService } from 'src/app/services/utensilios.service';
import { categoriaService } from 'src/app/services/categoria.service';

import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-utensilios',
  templateUrl: './utensilios.component.html',
  styleUrls: ['./utensilios.component.css']
})

export class UtensiliosComponent implements OnInit {
  descrip: "";
  uten:utensilios[]
  busqueda: utensilios[]
  cat: categorias[]
  dataSource:MatTableDataSource<any>;
    page = 1
    pageSize = 5
    utencilid
    EDITANDO = false;
    categorianombre = "";
    catdesordenado:utensilios[]
    ordenado:boolean=false;
    myForm = new FormGroup({
        Nombre: new FormControl('', Validators.required),
        Cantidad: new FormControl('', Validators.required),
        Precio: new FormControl('', Validators.required),
        IdCategoria: new FormControl('', Validators.required),
        Descripcion: new FormControl('', Validators.required)
    });
  constructor(private utensilios: utensiliosService, private categoria: categoriaService,config: NgbModalConfig, private modalService: NgbModal, private fb: FormBuilder) {
        config.backdrop = 'static';
        config.keyboard = false;
   
      }
   
  applyFilter(e){
    let filtro=this.uten.filter(fabian => fabian.Nombre.includes(e.target.value))
    this.uten=filtro
    if(e.target.value.length<=0){
        this.obtenercitas()
    }
}
cambiarid(event){
  this.myForm.value.IdCategoria=event.target.value;
}

opened(content, datos:any) {
  this.modalService.open(content);
  this.categorianombre = this.cat.find(fab=>fab.IdCategoria==datos.IdCategoria).Nombre;
  console.log(this.cat.find(fab=>fab.IdCategoria==datos.IdCategoria).Nombre)
  this.myForm.patchValue({
      Descripcion: datos.Descipcion,
      IdCategoria: datos.IdCategoria
  })
}
open(content, datos: any) {
  this.modalService.open(content);
  if(datos){
      this.EDITANDO = true
      this.myForm.patchValue({
          Nombre: datos.Nombre,
          Cantidad: datos.Cantidad,
          Precio: datos.Precio,
          IdCategoria: datos.IdCategoria,
          Descripcion: datos.Descipcion
      })
      this.utencilid = datos.IdUtensilios
  }
  else{
      this.EDITANDO = false
      this.myForm.patchValue({
          Nombre: "",
          Cantidad: "",
          Precio: "",
          IdCategoria: "",
          Descripcion: ""
      })
  }
}
sortNombre(){
  if(this.ordenado){
      this.obtenercitas()
      this.ordenado=false
  }else{
      this.ordenado=true
      this.catdesordenado=this.uten;
      this.uten.sort((a, b) => a.Nombre.localeCompare(b.Nombre))
  }
}
sortPrecio(){
  if(this.ordenado){
      this.obtenercitas()
      this.ordenado=false
  }else{
      this.ordenado=true
      this.catdesordenado=this.uten;
      this.uten.sort((a, b) => a.Precio.localeCompare(b.Precio))
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
          this.utensilios.eliminarcat(datos.IdUtensilios).subscribe(fabian => {
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

obtenercitas(){
  this.utensilios.getutensilios().subscribe((resp:any)=>{
    this.uten=resp;
    
})
this.dataSource=new MatTableDataSource(this.uten)
}
obtenercategoria() {
  this.categoria.getcategoria().subscribe((resp: any) => {
      this.cat = resp;
  })
  this.dataSource = new MatTableDataSource(this.cat)
  
}
  ngOnInit(): void {
    this.obtenercitas()
    this.obtenercategoria()
}
onSubmit() {
  if(this.myForm.valid){
      let datos = null
      if(this.EDITANDO){

          datos = {
              IdUtensilios: this.utencilid,
              Nombre: this.myForm.value.Nombre,
              Cantidad: this.myForm.value.Cantidad,
              Precio: this.myForm.value.Precio,
              IdCategoria: this.myForm.value.IdCategoria,
              Descipcion: this.myForm.value.Descripcion,
              Delete: false
          }
          this.utensilios.editar(datos).subscribe((fabi: any) => {
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
              Cantidad: this.myForm.value.Cantidad,
              Precio: this.myForm.value.Precio,
              IdCategoria: this.myForm.value.IdCategoria,
              Descipcion: this.myForm.value.Descripcion,
              Delete: false
          }
          this.utensilios.guardar(datos).subscribe((fabi: any) => {
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
}
interface utensilios{
  Nombre,
  Cantidad,
  Precio
}
interface categorias {
  IdCategoria,
  Nombre,
}