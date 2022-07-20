import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class pacientesService {

    url = environment.api + 'pacientes'

    constructor(private http: HttpClient) { }

    getpacientes() {
        let heades = new HttpHeaders()
            .set('tipy.content', 'aplication/json')
        return this.http.get(this.url, {
            headers: heades
        })
    }

    guardar(datos) {
        return this.http.post(this.url, datos)
    }

    editar(datos) {
        return this.http.put(this.url + "/" + datos.DniPa, datos)
    }

    eliminarcat(id) {
        return this.http.delete(this.url + "/" + id)
    }
}
