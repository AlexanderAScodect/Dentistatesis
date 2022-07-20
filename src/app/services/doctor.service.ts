import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class DoctorService {

    url = environment.api + 'doctores'

    constructor(private http: HttpClient) { }

    getdoctor() {
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
        console.log(datos)
        return this.http.put(this.url + "/" + datos.DniDo, datos)
    }

    eliminarcat(id) {
        return this.http.delete(this.url + "/" + id)
    }
}
