import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CitaService {
    url = environment.api + 'citas'

    constructor(private http: HttpClient) { }
    eltoken=sessionStorage.getItem("token");

    getcitas() {
        let heades = new HttpHeaders()
            .set('tipy.content', 'aplication/json')
        return this.http.get(this.url, {
            headers: heades
        })
    }

    guardar(datos) {
        let heades=new HttpHeaders()
        heades.append("Authorization", "Bearer " +this.eltoken )
        .set('tipy.content', 'aplication/json')
        return this.http.post(this.url, datos,{
            headers: heades
        })
    }

    editar(datos) {
        return this.http.put(this.url + "/" + datos.IdCitas, datos)
    }

    eliminarcat(id) {
        return this.http.delete(this.url + "/" + id)
    }
}
