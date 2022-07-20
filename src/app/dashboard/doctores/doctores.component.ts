import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';

import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-doctores',
    templateUrl: './doctores.component.html',
    styleUrls: ['./doctores.component.css']
})

export class DoctoresComponent implements OnInit {

    mostraragregar: false;
    doc: doctor[]
    public busqueda: any = []
    constructor(private doctor: DoctorService, config: NgbModalConfig, private modalService: NgbModal, private fb: FormBuilder) {
      config.backdrop = 'static';
      config.keyboard = false;
    }
    dataSource: MatTableDataSource<any>;
    page = 1
    pageSize = 5
    pacienteid
    EDITANDO = false;
    catdesordenado: doctor[]
    ordenado: boolean = false;
    emailFormControl = new FormControl('', [Validators.required, Validators.email]);
    myForm = new FormGroup({
      DniDo: new FormControl('', Validators.required),
      Nombre: new FormControl('', Validators.required),
      Correo: new FormControl('', Validators.required),
      Telefono: new FormControl('', Validators.required),
      Clave: new FormControl('', Validators.required),
    });
    applyFilter(e) {
      let filtro = this.doc.filter(fabian => fabian.DniDo.toString().includes(e.target.value.toString()))
      this.doc = filtro
      if (e.target.value.length <= 0) {
        this.obtenerdoctor()
      }
    }
    open(content, datos: any) {
      this.modalService.open(content);
      
      if (datos) {
        this.EDITANDO = true
        this.myForm.patchValue({
          DniDo: datos.DniDo,
          Nombre: datos.Nombre,
          Correo: datos.Correo,
          Clave: datos.Clave,
          Telefono: datos.Telefono
        })
        this.pacienteid = datos.DniPa
      }
      else {
        this.EDITANDO = false
        this.myForm.patchValue({
          DniDo: "",
          Nombre: "",
          Correo: "",
          Clave:"",
          Telefono: ""
        })
      }
    }
    sortNombre() {
  
      if (this.ordenado) {
        this.obtenerdoctor()
        this.ordenado = false
      } else {
        this.ordenado = true
        this.catdesordenado = this.doc;
        this.doc.sort((a, b) => a.Nombre.localeCompare(b.Nombre))
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
          this.doctor.eliminarcat(datos.DniPa).subscribe(fabian => {
            this.obtenerdoctor()
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
    obtenerdoctor() {
      this.doctor.getdoctor().subscribe((resp: any) => {
        this.doc = resp;
      })
      this.dataSource = new MatTableDataSource(this.doc)
    }
    ngOnInit(): void {
      this.obtenerdoctor()
  
    }
    onSubmit() {
      console.log(this.myForm.value)
      if (this.myForm.valid) {
        let datos = null
        
        if (this.EDITANDO) {
  
          datos = {
            DniDo: this.myForm.value.DniDo,
            Nombre: this.myForm.value.Nombre,
            Correo: this.myForm.value.Correo,
            Clave: this.myForm.value.Clave,
            Telefono: this.myForm.value.Telefono,
            Delete: false,
  
          }
          
  
  
          this.doctor.editar(datos).subscribe((fabi: any) => {
  
            this.modalService.dismissAll()
            this.obtenerdoctor()
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Se han guardado los cambios',
              showConfirmButton: false,
              timer: 1500
            })
          })
        }
        else {
          datos = {
            DniDo: this.myForm.value.DniDo,
            Nombre: this.myForm.value.Nombre,
            Correo: this.myForm.value.Correo,
            Clave: this.myForm.value.Clave,
            Telefono: this.myForm.value.Telefono,
            Delete: false
          }
          this.doctor.guardar(datos).subscribe((fabi: any) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Se han guardado los cambios',
              showConfirmButton: false,
              timer: 1500
            })
            this.modalService.dismissAll()
            this.obtenerdoctor()
          })
        }
      }
    }
  }
  interface doctor {
    Nombre,
    Correo,
    DniDo,
    Dni
    Telefono
  }