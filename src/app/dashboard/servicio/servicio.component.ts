import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { serviciosService } from 'src/app/services/servicio.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CitaService } from 'src/app/services/citas.servicios';
import { pacientesService } from 'src/app/services/paciente.service';
import { DoctorService } from 'src/app/services/doctor.service';
import flatpickr from 'flatpickr';
import * as moment from 'moment';

@Component({
    selector: 'app-servicio',
    templateUrl: './servicio.component.html',
    styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {
    mostraragregar: false;
    serv: Servicios[]
    pac: pacientes[]
    doc: doctor[]
    cit: citas[]
    public busqueda: any = []
    dataSource: MatTableDataSource<any>;
    servicioid
    page = 1
    pageSize = 5
    servic = {
        hora: null,
        fecha: null
    }
    constructor(private servicio: serviciosService, private cita: CitaService,
        private paciente: pacientesService, private doctor: DoctorService,
        config: NgbModalConfig, private modalService: NgbModal, private fb: FormBuilder) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

    EDITANDO = false;
    catdesordenado: Servicios[]
    ordenado: boolean = false;
    myForm = new FormGroup({
        Fechadia: new FormControl('', Validators.required),
        Fechahora: new FormControl('', Validators.required),
        DniDo: new FormControl('', Validators.required),
        DniPa: new FormControl('', Validators.required),
        IdCitas: new FormControl('', Validators.required),
        Total: new FormControl('', Validators.required),
        Observaciones: new FormControl('', Validators.required)
    });
    cambiardoc(event) {
        this.myForm.value.DniDo = event;
    }
    cambiarpac(dnipacie) {

        this.myForm.value.DniPa = dnipacie;
    }
    cambiarcita(idcita) {
        this.myForm.patchValue({
            Total: this.cit.find(fab => fab.IdCitas == idcita).Precio
        })

    }
    applyFilter(e) {
        let filtro = this.serv.filter(fabian => fabian.fechahora.includes(e.target.value))
        this.serv = filtro
        if (e.target.value.length <= 0) {
            this.obtenerservicio()
        }
    }
    open(content, datos: any) {
        flatpickr('#fecha-servicio', {
            onChange: (selectedDates, dateStr, instance) => {
                this.servic.fecha = dateStr
            }
        })
        flatpickr('#hora-servicio', {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            maxTime: "21:30",
            onChange: (selectedDates, dateStr, instance) => {
                this.servic.hora = dateStr
            }
        })

        this.modalService.open(content);

        if (datos) {
            this.EDITANDO = true
            this.myForm.patchValue({
                Fechadia: datos.fechadia.split("T")[0],
                Fechahora: datos.fechahora,
                DniDo: datos.DniDo,
                DniPa: datos.DniPa,
                IdCitas: datos.IdCitas,
                Total: datos.total,
                Observaciones: datos.observaciones
            })
            this.servicioid = datos.IdServicios
            console.log(datos)
        }
        else {
            this.EDITANDO = false
            this.myForm.patchValue({
                Fechadia: "",
                Fechahora: "",
                DniDo: "",
                DniPa: "",
                IdCitas: "",
                Total: "",
                Observaciones: ""
            })
            var ahora = moment().add(2, 'seconds').format('hh:mm');
            flatpickr('#fecha-servicio', {
                minDate: "today",
                defaultDate: "today",
                onChange: (selectedDates, dateStr, instance) => {
                    this.servic.fecha = dateStr
                }
            })
            flatpickr('#hora-servicio', {
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
                maxTime: "21:30",
                defaultDate: ahora,
                onChange: (selectedDates, dateStr, instance) => {
                    this.servic.hora = dateStr
                }
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
                this.servicio.eliminarcat(datos.IdServicios).subscribe(fabian => {
                    this.obtenerservicio()
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
    obtenerpacientes() {
        this.paciente.getpacientes().subscribe((resp: any) => {
            this.pac = resp;
        })
        this.dataSource = new MatTableDataSource(this.pac)
    }
    obtenerdoctor() {
        this.doctor.getdoctor().subscribe((resp: any) => {
            this.doc = resp;
        })
        this.dataSource = new MatTableDataSource(this.doc)
    }
    obtenerservicio() {
        this.servicio.getserviciosDatos().subscribe((resp: any) => {
            this.serv = resp;
        })
        this.dataSource = new MatTableDataSource(this.serv)
    }
    obtenercitas() {
        this.cita.getcitas().subscribe((resp: any) => {
            this.cit = resp;
        })
        this.dataSource = new MatTableDataSource(this.cit)
    }
    ngOnInit(): void {
        this.obtenerservicio()
        this.obtenerdoctor()
        this.obtenerpacientes()
        this.obtenercitas()
    }
    sortEdad() {
        if (this.ordenado) {
            this.obtenerservicio()
            this.ordenado = false
        } else {
            this.ordenado = true
            this.serv.sort((a, b) => a.fechadia.localeCompare(b.fechadia))
        }
    }
    realizadocita(datos) {
        let data = {
            ...datos,
            realizo:false,
        };
        this.servicio.editar(data).subscribe(res => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se han guardado los cambios',
                showConfirmButton: false,
                timer: 1500
            })
            this.obtenerservicio()
        })
    }
    onSubmit() {

        if (this.myForm.valid) {
            let datos = null
            if (this.EDITANDO) {
                datos = {
                    IdServicios: this.servicioid,
                    Fechadia: this.myForm.value.Fechadia,
                    Fechahora: this.myForm.value.Fechahora,
                    DniDo: this.myForm.value.DniDo,
                    DniPa: this.myForm.value.DniPa,
                    IdCitas: this.myForm.value.IdCitas,
                    Total: this.myForm.value.Total,
                    Observaciones: this.myForm.value.Observaciones,
                    Delete: false,
                    realizo: true,
                }
                this.servicio.editar(datos).subscribe((fabi: any) => {
                    this.modalService.dismissAll()
                    this.obtenerservicio()
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se han guardado los cambios',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                
                console.log(datos)
            }
            else {
                datos = {
                    Fechadia: this.servic.fecha,
                    Fechahora: this.servic.hora,
                    DniDo: this.myForm.value.DniDo,
                    DniPa: this.myForm.value.DniPa,
                    IdCitas: this.myForm.value.IdCitas,
                    Total: this.myForm.value.Total,
                    Observaciones: this.myForm.value.Observaciones,
                    Delete: false,
                    realizo: true,
                }
                this.servicio.guardar(datos).subscribe((fabi: any) => {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se han guardado los cambios',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.modalService.dismissAll()
                    this.obtenerservicio()
                    
                })
            }
        }

    }
}

interface Servicios {
    fechadia,
    fechahora,
    DniDo_nombre,
    DniPa_nombre,
    IdCitas_nombre,
    total,
    observaciones,
    realizo
}
interface doctor {
    Nombre,
    DniDo
}
interface pacientes {
    DniPa,
    Nombre,
}
interface citas {
    Nombre,
    IdCitas,
    Precio
}