import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class adminservice {

    url = environment.api
    
    constructor(private http: HttpClient) {}

    getadmin() {
        let heades = new HttpHeaders()
            .set('tipy.content', 'aplication/json')
        return this.http.get(this.url + 'administradores', {
            headers: heades
        })
    }
    obtenertoken(datos){
        return this.http.post(this.url + "token" , datos)
    }
    editar(datos) {
        return this.http.put(this.url + "/administradores/" + datos.DniAd, datos)
    }
}
