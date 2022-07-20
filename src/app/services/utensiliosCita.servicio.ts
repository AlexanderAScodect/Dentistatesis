import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UtenciliosCitaService {
    url = environment.api + 'UtenciliosCita'

    constructor(private http: HttpClient) { }
    eltoken=sessionStorage.getItem("token");
    getUtenciliosCita() {
        let heades = new HttpHeaders()
            .set('tipy.content', 'aplication/json')
        return this.http.get(this.url, {
            headers: heades
        })
    }
    getUtenciliosCitaDATOS(){
        let heades=new HttpHeaders()
        heades.append("Authorization", "Bearer " +this.eltoken )
        .set('tipy.content', 'aplication/json')
        return this.http.get(this.url + "/utenciliosCitaDatos",{
          headers:heades
        })
      }
    guardar(datos) {
        return this.http.post(this.url, datos)
    }

    editar(datos) {
        return this.http.put(this.url + "/" + datos.IdUtensiliosCitas, datos)
    }

    eliminarcat(id) {
        return this.http.delete(this.url + "/" + id)
    }
}
