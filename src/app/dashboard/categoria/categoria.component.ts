import { Component, OnInit } from '@angular/core';
import { categoriaService } from '../../services/categoria.service';

import { MatTableDataSource } from '@angular/material/table';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-categoria',
    templateUrl: './categoria.component.html',
    styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
    descrip: "";
    mostraragregar: false;
    cat: categorias[]
    busqueda: categorias[]
    dataSource: MatTableDataSource<any>;
    page = 1
    pageSize = 5
    categoriid
    EDITANDO = false;
    catdesordenado:categorias[]
    ordenado:boolean=false;
    myForm = new FormGroup({
        Nombre: new FormControl('', Validators.required),
        Descripcion: new FormControl('', Validators.required)
    });
    constructor(private categoria: categoriaService, config: NgbModalConfig, private modalService: NgbModal, private fb: FormBuilder) {
        config.backdrop = 'static';
        config.keyboard = false;
    }
    applyFilter(e) {
        let filtro = this.cat.filter(fabian => fabian.Nombre.includes(e.target.value))
        this.cat = filtro
        if (e.target.value.length <= 0) {
            this.obtenercategoria()
        }
    }
    opened(content, datos:any) {
        this.modalService.open(content);
        this.myForm.patchValue({
            Descripcion: datos.Descripcion
        })
      }
    open(content, datos: any) {
        this.modalService.open(content);
        if(datos){
            this.EDITANDO = true
            this.myForm.patchValue({
                Nombre: datos.Nombre,
                Descripcion: datos.Descripcion
            })
            this.categoriid = datos.IdCategoria
        }
        else{
            this.EDITANDO = false
            this.myForm.patchValue({
                Nombre: "",
                Descripcion: ""
            })
        }
    }
    sortNombre(){
        
        if(this.ordenado){
            this.obtenercategoria()
            this.ordenado=false
        }else{
            this.ordenado=true
            this.catdesordenado=this.cat;
            this.cat.sort((a, b) => a.Nombre.localeCompare(b.Nombre))
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
                this.categoria.eliminarcat(datos.IdCategoria).subscribe(fabian => {
                    this.obtenercategoria()
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
    obtenercategoria() {
        this.categoria.getcategoria().subscribe((resp: any) => {
            this.cat = resp;
        })
        this.dataSource = new MatTableDataSource(this.cat)
        
    }
    ngOnInit(): void {
        this.obtenercategoria()
        
    }
    onSubmit() {
        
        if(this.myForm.valid){
            let datos = null
            if(this.EDITANDO){

                datos = {
                    IdCategoria: this.categoriid,
                    Nombre: this.myForm.value.Nombre,
                    Descripcion: this.myForm.value.Descripcion,
                    Delete: false
                }
                this.categoria.editar(datos).subscribe((fabi: any) => {
                    this.modalService.dismissAll()
                    this.obtenercategoria()
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
                    Delete: false
                }
                this.categoria.guardar(datos).subscribe((fabi: any) => {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se han guardado los cambios',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    this.modalService.dismissAll()
                    this.obtenercategoria()
                })
            }
        }
        
    }
}
interface categorias {
    IdCategoria,
    Nombre,
    Descripcion

}
