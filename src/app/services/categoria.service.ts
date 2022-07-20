import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class categoriaService {

    url = environment.api + 'categoria'

    constructor(private http: HttpClient) {}

    getcategoria() {
        let heades = new HttpHeaders()
            .set('tipy.content', 'aplication/json')
        return this.http.get(this.url, {
            headers: heades
        })
    }

    guardar(datos){
        return this.http.post(this.url, datos)
    }

    editar(datos){
        return this.http.put(this.url+"/"+datos.IdCategoria, datos)
    }

    eliminarcat(id) {
        return this.http.delete(this.url+"/"+id)
    }
}
