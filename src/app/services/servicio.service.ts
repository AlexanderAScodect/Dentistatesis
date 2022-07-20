import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class serviciosService {
    url = environment.api + 'servicios'
    constructor(private http: HttpClient) { }
    eltoken=sessionStorage.getItem("token");
    getservicios() {
        let heades = new HttpHeaders()
            .set('tipy.content', 'aplication/json')
        return this.http.get(this.url, {
            headers: heades
        })
    }
    getserviciosPorPaciente(id){
        return this.http.get(this.url + "/Paciente/" + id)
    }
    getserviciosPorDoctor(dni){
        return this.http.get(this.url + "/Doctor/" + dni)
    }
    getserviciosDatos(){
        let heades=new HttpHeaders()
        
        .set('tipy.content', 'aplication/json')
        return this.http.get(this.url+"/servicioDatos",{
          headers:heades
        })
      }
    guardar(datos) {
        let heades=new HttpHeaders()
        heades.append("Authorization", "Bearer " +this.eltoken )
        .set('tipy.content', 'aplication/json')
        return this.http.post(this.url, datos)
    }
    editar(datos) {
        return this.http.put(this.url + "/" + datos.IdServicios, datos)
    }
    eliminarcat(id) {
        return this.http.delete(this.url + "/" + id)
    }
}
